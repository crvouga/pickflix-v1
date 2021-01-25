import buildPostgresSessionStore from "connect-pg-simple";
import redis from "redis";
import buildRedisSessionStore from "connect-redis";
import session from "express-session";
import fs from "fs";
import { IPostgresDatabase } from "../persistence/postgres/database.postgres";
import { secrets } from "../../config";

const PostgresSessionStore = buildPostgresSessionStore(session);
const RedisSessionStore = buildRedisSessionStore(session);

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

export const buildSessionStoreRedis = async () => {
  const client = redis.createClient(secrets.redisConnectionString);
  return new RedisSessionStore({
    client,
  });
};
