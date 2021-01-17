import sgMail from "@sendgrid/mail";
import axios from "axios";
import path from "path";
import { getRepositoryImplementation, secrets } from "../../config";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import { HashMapCache } from "../persistence/cache/cache.hash-map";
import { RedisCache } from "../persistence/cache/cache.redis";
import { PostgresDatabase } from "../persistence/postgres/database.postgres";
import { buildSessionStorePostgres } from "../express/session-store";
import { EmailLogic } from "../email";
import { createEventEmitter, Events } from "../events";
import {
  authenticate,
  isAuthenticated,
} from "../express/authentication-middleware";
import { buildExpressApp } from "../express/build-app";
import { ExpressAppDependencies } from "../express/types";
import {
  buildRepositoriesFileSystem,
  buildRepositoriesPostgres,
} from "./build-repositories";

/* 


*/

const POSTGRES_DEVELOPMENT_CONFIG = {
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "pickflix_development",
};

const REDIS_DEVELOPMENT_CONFIG = {
  connectionString: secrets.redisConnectionString,
};

/* 


*/

export const buildPersistencePostgresRedis = async () => {
  const database = new PostgresDatabase(POSTGRES_DEVELOPMENT_CONFIG);

  const { repositories, initializeAllTables } = await buildRepositoriesPostgres(
    database
  );

  await initializeAllTables();

  const sessionStore = await buildSessionStorePostgres(database);

  const cache = new RedisCache<string, string>(REDIS_DEVELOPMENT_CONFIG);

  return {
    cache,
    sessionStore,
    repositories,
  };
};

export const buildPersistenceDefault = async () => {
  const filePath = path.join(__dirname, "..", "..", "..", "_store");

  const { repositories } = await buildRepositoriesFileSystem(filePath);

  const sessionStore = undefined;

  const cache = new HashMapCache<string, string>();

  return {
    sessionStore,
    repositories,
    cache,
  };
};

const buildPersistence = async () => {
  switch (getRepositoryImplementation()) {
    case "postgres":
      return buildPersistencePostgresRedis();

    default:
      return buildPersistenceDefault();
  }
};

/* 


*/

export const buildAppDevelopment = async () => {
  const { repositories, sessionStore, cache } = await buildPersistence();

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
