import sgMail from "@sendgrid/mail";
import axios from "axios";
import { secrets } from "../../config";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import { RedisCache } from "../persistence/cache/cache.redis";
import { PostgresDatabase } from "../persistence/postgres/database.postgres";
import { buildSessionStorePostgres } from "../express/session-store";
import { EmailLogic } from "../../users/email";
import { createEventEmitter, Events } from "../../common/events";
import {
  authenticate,
  isAuthenticated,
} from "../express/authentication-middleware";
import { buildExpressApp } from "../express/build-app";
import { ExpressAppDependencies } from "../express/types";
import { buildRepositoriesPostgres } from "./build-repositories";

/* 


*/

export const POSTGRES_PRODUCTION_CONFIG = {
  connectionString: secrets.posgresConnectionString,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const REDIS_PRODUCTION_CONFIG = {
  connectionString: secrets.redisConnectionString,
};

const database = new PostgresDatabase(POSTGRES_PRODUCTION_CONFIG);

/* 


*/

export const buildAppProduction = async () => {
  const cache = new RedisCache<string, string>(REDIS_PRODUCTION_CONFIG);

  const { repositories, initializeAllTables } = await buildRepositoriesPostgres(
    database
  );

  await initializeAllTables();

  const sessionStore = await buildSessionStorePostgres(database);

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
