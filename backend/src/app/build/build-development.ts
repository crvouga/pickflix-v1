import sgMail from "@sendgrid/mail";
import axios from "axios";
import { getRepositoryImplementation, secrets } from "../../config";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import { RedisCache } from "../data-store/cache/cache.redis";
import { PostgresDatabase } from "../data-store/repository/postgres/database.postgres";
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
const databaseName = "pickflix_development";

const databaseConfig = {
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: databaseName,
};

const postgresDatabaseDevelopment = new PostgresDatabase(databaseConfig);

/* 


*/

const buildRepositoriesDevelopment = async () => {
  switch (getRepositoryImplementation()) {
    case "postgres":
      const {
        repositories,
        initializeAllTables,
      } = await buildRepositoriesPostgres(postgresDatabaseDevelopment);
      await initializeAllTables();
      return {
        repositories,
      };

    default:
      const FILE_STORE_PATH = __dirname + "/../../../_store";
      return buildRepositoriesFileSystem(FILE_STORE_PATH);
  }
};

const redisCache = new RedisCache<string, string>({
  connectionString: secrets.redisConnectionString,
});

/* 


*/

export const buildLogicDevelopment = async () => {
  const { repositories } = await buildRepositoriesDevelopment();

  const eventEmitter = createEventEmitter<Events>();

  const mediaLogic = new MediaLogic({
    ...repositories,
    axios,
    cache: redisCache,
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

  return {
    appLogic,
  };
};

/* 


*/

export const buildAppDevelopment = async () => {
  const { appLogic } = await buildLogicDevelopment();

  const dependencies: ExpressAppDependencies = {
    ...appLogic,
    postgresDatabase: postgresDatabaseDevelopment,
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
