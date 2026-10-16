import buildPostgresSessionStore from "connect-pg-simple";
import session from "express-session";
import { getNodeEnv } from "../../config";
import fs from "fs";
import buildMemorySessionStore from "memorystore";
import { IPostgresDatabase } from "../persistence/postgres/database.postgres";

const InMemorySessionStore = buildMemorySessionStore(session);
const PostgresSessionStore = buildPostgresSessionStore(session);

//DOCS: https://www.npmjs.com/package/connect-pg-simple
const TABLE_NAME = "session";
const SESSION_TABLE_PATH = "node_modules/connect-pg-simple/table.sql";

export const buildSessionStorePostgres = async (
  postgresDatabase: IPostgresDatabase
) => {
  const doesSessionTableExists = await postgresDatabase.doesTableExists(
    TABLE_NAME
  );

  if (!doesSessionTableExists && getNodeEnv() === "production") {
    throw new Error("Deploy the OpenTofu-managed pickflix.session table first");
  }

  if (!doesSessionTableExists) {
    const createSessionTableSql = fs
      .readFileSync(SESSION_TABLE_PATH)
      .toString();

    await postgresDatabase.query(createSessionTableSql);
  }

  const store = new PostgresSessionStore({
    pool: postgresDatabase.pool,
    tableName: TABLE_NAME,
    schemaName: getNodeEnv() === "production" ? "pickflix" : "public",
  });

  return store;
};

export const buildSessionStoreInMemory = async () => {
  return new InMemorySessionStore({});
};
