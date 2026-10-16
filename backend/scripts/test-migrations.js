// Destructive fixtures are restricted to the disposable hosting-test database.
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { migrateDatabase } = require('../build/app/persistence/postgres/migrations');

async function main() {
  const url = process.env.PICKFLIX_SMOKE_DATABASE_URL;
  assert(url && new URL(url).pathname.endsWith('_integration'));
  const pool = new Pool({ connectionString: url });
  const tables = ['auto_lists', 'list_items', 'lists', 'permissions',
    'tmdb_discover_tags', 'reviews', 'review_votes', 'credentials', 'users'];
  try {
    await pool.query('CREATE TABLE public.lists (marker text); INSERT INTO public.lists VALUES (\'preserved\')');
    await pool.query('CREATE SCHEMA pickflix');
    await pool.query(fs.readFileSync(path.join(__dirname, '../migrations/001-baseline.sql'), 'utf8'));
    await pool.query('CREATE PUBLICATION powersync FOR ALL TABLES');
    for (const table of tables) {
      await pool.query(`INSERT INTO pickflix.${table} (id) VALUES ('existing')`);
      await assert.rejects(pool.query(`UPDATE pickflix.${table} SET id=id`), /replica identity/);
    }
    // Invalid legacy IDs abort the complete adoption without partial keys/history.
    await pool.query("INSERT INTO pickflix.users (id) VALUES ('existing')");
    await assert.rejects(migrateDatabase(pool), /duplicate|unique/i);
    assert.equal((await pool.query("SELECT to_regclass('pickflix.schema_migrations') AS history")).rows[0].history, null);
    await pool.query("INSERT INTO pickflix.lists (id) VALUES (NULL)");
    // Published deletes still cannot run without keys; remove only the test publication.
    await pool.query('DROP PUBLICATION powersync');
    await pool.query('DELETE FROM pickflix.users WHERE ctid IN (SELECT ctid FROM pickflix.users LIMIT 1)');
    await assert.rejects(migrateDatabase(pool), /null/i);
    await pool.query('DELETE FROM pickflix.lists WHERE id IS NULL');
    await pool.query('CREATE PUBLICATION powersync FOR ALL TABLES');
    await Promise.all([migrateDatabase(pool), migrateDatabase(pool)]);
    await migrateDatabase(pool);
    assert.equal((await pool.query('SELECT count(*)::int AS n FROM pickflix.schema_migrations')).rows[0].n, 2);
    for (const table of tables) {
      assert.deepEqual((await pool.query(`SELECT id FROM pickflix.${table}`)).rows, [{ id: 'existing' }]);
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        await client.query('SET LOCAL search_path=pickflix');
        await client.query(`UPDATE ${table} SET id='updated'`);
        await client.query(`DELETE FROM ${table}`);
        await client.query('COMMIT');
      } finally { client.release(); }
    }
    assert.deepEqual((await pool.query('SELECT marker FROM public.lists')).rows, [{ marker: 'preserved' }]);
    // Leave an empty database to test first-start bootstrap through the image entrypoint.
    await pool.query('DROP PUBLICATION powersync; DROP SCHEMA pickflix CASCADE');
    console.log('PASS: legacy adoption, published writes, schema isolation, concurrency, retry, rollback');
  } finally { await pool.end(); }
}
main().catch(err => { console.error(err); process.exitCode = 1; });
