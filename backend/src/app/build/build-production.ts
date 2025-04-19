import sgMail from "@sendgrid/mail";
import axios from "axios";
import { createEventEmitter, Events } from "../../common/events";
import { secrets } from "../../config";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { EmailLogic } from "../../users/email";
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
  ssl: {
    rejectUnauthorized: false,
  },
};

/* 


*/

const buildPersistence = async (database: PostgresDatabase) => {
  const { repositories, initializeAllTables } = await buildRepositoriesPostgres(
    database
  );

  const sessionStore = await buildSessionStorePostgres(database);

  return {
    repositories,
    initializeAllTables,
    sessionStore,
  };
};

export const buildAppProduction = async () => {
  const cache = new HashMapCache<string, string>();
  const database = new PostgresDatabase(POSTGRES_PRODUCTION_CONFIG);

  const { repositories, sessionStore, initializeAllTables } =
    await buildPersistence(database);

  await initializeAllTables();

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

  const emailLogic = new EmailLogic({
    emailService: sgMail,
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
