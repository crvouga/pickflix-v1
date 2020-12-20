import buildPostgresSessionStore from "connect-pg-simple";
import cookieParser from "cookie-parser";
import { Application } from "express";
import session from "express-session";
import fs from "fs";
import { getNodeEnv, secrets } from "../../config";
import { IPostgresDatabase } from "../data-store/repository/postgres/database.postgres";
import { ExpressAppDependencies } from "./types";

const PostgresSessionStore = buildPostgresSessionStore(session);

const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_MONTH = ONE_DAY * 30;

//DOCS: https://www.npmjs.com/package/connect-pg-simple
const TABLE_NAME = "session";
const SESSION_TABLE_PATH = "node_modules/connect-pg-simple/table.sql";
const getSessionStore = async (postgresDatabase: IPostgresDatabase) => {
  if (getNodeEnv() === "test") {
    return undefined;
  }

  if (!(await postgresDatabase.doesTableExists(TABLE_NAME))) {
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

export const useSessionMiddleware = ({
  postgresDatabase,
}: ExpressAppDependencies) => async (app: Application) => {
  app.use(cookieParser());

  const store = await getSessionStore(postgresDatabase);

  const sessionOptions: session.SessionOptions = {
    name: "pickflix-session",
    store: store,
    secret: secrets.secret,
    resave: false,
    saveUninitialized: true,
    cookie:
      getNodeEnv() === "production"
        ? {
            secure: true,
            path: "/",
            sameSite: "strict" as "strict",
            httpOnly: true,
            maxAge: ONE_MONTH,
          }
        : {
            path: "/",
            secure: false,
            httpOnly: true,
            maxAge: ONE_MONTH,
          },
  };

  app.use(session(sessionOptions));
};
