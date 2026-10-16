import { createHash } from "crypto";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import { Pool } from "pg";

const directory = resolve(__dirname, "../../../../migrations");

// Run before serving requests. One transaction and an advisory lock serialize
// concurrent replicas; a failed migration leaves schema and history unchanged.
export const migrateDatabase = async (pool: Pool) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SET LOCAL lock_timeout = '30s'");
    await client.query("SELECT pg_advisory_xact_lock(716521, 1)");
    await client.query("CREATE SCHEMA IF NOT EXISTS pickflix");
    await client.query(`CREATE TABLE IF NOT EXISTS pickflix.schema_migrations (
      name text PRIMARY KEY, checksum text NOT NULL,
      applied_at timestamptz NOT NULL DEFAULT now()
    )`);
    const history = await client.query<{ name: string; checksum: string }>(
      "SELECT name, checksum FROM pickflix.schema_migrations"
    );
    const applied = new Map(history.rows.map(row => [row.name, row.checksum]));
    const files = readdirSync(directory).filter(name => /^\d{3}-.+\.sql$/.test(name)).sort();
    for (const name of Array.from(applied.keys())) {
      if (!files.includes(name)) throw new Error(`Missing applied migration: ${name}`);
    }
    for (const name of files) {
      const sql = readFileSync(resolve(directory, name), "utf8");
      const checksum = createHash("sha256").update(sql).digest("hex");
      if (applied.has(name)) {
        if (applied.get(name) !== checksum) throw new Error(`Changed applied migration: ${name}`);
        continue;
      }
      await client.query(sql);
      await client.query(
        "INSERT INTO pickflix.schema_migrations (name, checksum) VALUES ($1, $2)",
        [name, checksum]
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
