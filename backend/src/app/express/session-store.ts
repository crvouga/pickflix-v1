import buildPostgresSessionStore from "connect-pg-simple";
import session from "express-session";
import fs from "fs";
import { IPostgresDatabase } from "../persistence/postgres/database.postgres";

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

  if (!doesSessionTableExists) {
    const createSessionTableSql = fs
      .readFileSync(SESSION_TABLE_PATH)
      .toString();

    await postgresDatabase.query(createSessionTableSql);
  }

  const store = new PostgresSessionStore({
    pool: postgresDatabase.pool,
    tableName: TABLE_NAME,
  });

  return store;
};
