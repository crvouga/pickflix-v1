import buildPostgresSessionStore from "connect-pg-simple";
import cookieParser from "cookie-parser";
import { Application } from "express";
import session from "express-session";
import fs from "fs";
import { getNodeEnv, secrets } from "../../config";
import { IPostgresDatabase } from "../data-store/repository/postgres/database.postgres";
import { ExpressAppDependencies } from "./types";

const PostgresSessionStore = buildPostgresSessionStore(session);

const getSessionCookieConfig = () => {
  switch (getNodeEnv()) {
    case "production":
      return {
        secure: true,
        path: "/",
        sameSite: "strict" as "strict",
        httpOnly: true,
      };
    default:
      return {
        path: "/",
        secure: false,
        httpOnly: true,
      };
  }
};

//DOCS: https://www.npmjs.com/package/connect-pg-simple
const getSessionStore = async (postgresDatabase: IPostgresDatabase) => {
  const TABLE_NAME = "session";
  const SESSION_TABLE_PATH = "node_modules/connect-pg-simple/table.sql";

  if (getNodeEnv() === "test") {
    return undefined;
  }

  if (!(await postgresDatabase.doesTableExists(TABLE_NAME))) {
    const sql = fs.readFileSync(SESSION_TABLE_PATH).toString();
    await postgresDatabase.query(sql);
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

  const cookie = getSessionCookieConfig();

  const sessionOptions: session.SessionOptions = {
    name: "pickflix-session",
    store: store,
    secret: secrets.secret,
    resave: false,
    saveUninitialized: true,
    cookie: cookie,
  };

  app.use(session(sessionOptions));
};
