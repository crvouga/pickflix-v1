import axios from "axios";
import { createEventEmitter, Events } from "../../common/events";
import { secrets } from "../../config";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { ResendEmailLogic } from "../../users/email/resend";
import { UserLogic } from "../../users/logic/logic";
import {
  authenticate,
  isAuthenticated,
} from "../express/authentication-middleware";
import { buildExpressApp } from "../express/build-app";
import { buildSessionStorePostgres } from "../express/session-store";
import { ExpressAppDependencies } from "../express/types";
import { HashMapCache } from "../persistence/cache/cache.hash-map";
import { PostgresDatabase } from "../persistence/postgres/database.postgres";
import { buildRepositoriesPostgres } from "./build-repositories";

/* 


*/

export const POSTGRES_PRODUCTION_CONFIG = {
  connectionString: secrets.posgresConnectionString,
  options: "-c search_path=pickflix",
  ssl: {
    rejectUnauthorized: false,
  },
};

/* 


*/

const buildPersistence = async (database: PostgresDatabase) => {
  const { repositories } = await buildRepositoriesPostgres(
    database
  );

  const sessionStore = await buildSessionStorePostgres(database);

  return {
    repositories,
    sessionStore,
  };
};

export const buildAppProduction = async () => {
  const cache = new HashMapCache<string, string>();
  const database = new PostgresDatabase(POSTGRES_PRODUCTION_CONFIG);

  const { repositories, sessionStore } =
    await buildPersistence(database);

  // OpenTofu in crvouga/workspace owns all DDL. Fail before listening when
  // the schema has not been deployed, rather than creating tables at runtime.
  for (const table of ["users", "credentials", "reviews", "review_votes", "lists",
    "list_items", "auto_lists", "permissions", "tmdb_discover_tags", "session"]) {
    await database.query(`SELECT 1 FROM pickflix.${table} LIMIT 0`);
  }

  const eventEmitter = createEventEmitter<Events>();

  const mediaLogic = new MediaLogic({
    ...repositories,
    axios,
    cache,
  });

  const listLogic = new ListLogic({
    ...repositories,
    eventEmitter,
    mediaLogic,
  });

  const emailLogic = new ResendEmailLogic({
    http: axios,
    apiKey: secrets.resendApiKey,
  });

  const userLogic = new UserLogic({
    ...repositories,
    eventEmitter,
    emailLogic,
  });

  const reviewLogic = new ReviewLogic({
    ...repositories,
    mediaLogic,
  });

  const appLogic = {
    userLogic,
    mediaLogic,
    listLogic,
    reviewLogic,
  };

  const dependencies: ExpressAppDependencies = {
    ...appLogic,
    sessionStore,
    middlewares: {
      authenticate,
      isAuthenticated,
    },
  };

  const { app } = await buildExpressApp(dependencies);

  return {
    app,
  };
};
