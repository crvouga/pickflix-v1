import sgMail from "@sendgrid/mail";
import axios from "axios";
import { secrets } from "../../config";
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
import { buildRepositoriesPostgres } from "./build-repositories";

/* 


*/

const postgresDatabaseProduction = new PostgresDatabase({
  connectionString: secrets.posgresConnectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const redisCache = new RedisCache<string, string>({
  connectionString: secrets.redisConnectionString,
});

/* 


*/

export const buildLogicProduction = async () => {
  const { repositories, initializeAllTables } = await buildRepositoriesPostgres(
    postgresDatabaseProduction
  );

  await initializeAllTables();

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

  return {
    userLogic,
    mediaLogic,
    listLogic,
    reviewLogic,
  };
};

/*


*/

export const buildAppProduction = async () => {
  const appLogic = await buildLogicProduction();

  const dependencies: ExpressAppDependencies = {
    ...appLogic,
    postgresDatabase: postgresDatabaseProduction,
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
