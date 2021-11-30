import sgMail from "@sendgrid/mail";
import axios from "axios";
import path from "path";
import { createEventEmitter, Events } from "../../common/events";
import {
  getRepositoryImplementation,
  RepositoryImplementation,
} from "../../config";
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
import {
  buildSessionStoreInMemory,
  buildSessionStorePostgres,
} from "../express/session-store";
import { ExpressAppDependencies } from "../express/types";
import { HashMapCache } from "../persistence/cache/cache.hash-map";
import { createElseGetPostgresDatabase } from "../persistence/postgres/database.postgres";
import { POSTGRES_PRODUCTION_CONFIG } from "./build-production";
import {
  buildRepositoriesFileSystem,
  buildRepositoriesPostgres,
} from "./build-repositories";
/* 


*/

// const POSTGRES_DEVELOPMENT_CONFIG = {
//   user: "postgres",
//   host: "localhost",
//   port: 5432,
//   database: "pickflix_development",
// };

const POSTGRES_DEVELOPMENT_CONFIG = POSTGRES_PRODUCTION_CONFIG;

/* 


*/

const buildPersistence = async (
  repositoryImplementation: RepositoryImplementation
) => {
  switch (repositoryImplementation) {
    case "postgres": {
      const database = await createElseGetPostgresDatabase(
        POSTGRES_DEVELOPMENT_CONFIG
      );

      const { repositories, initializeAllTables } =
        await buildRepositoriesPostgres(database);

      await initializeAllTables();

      const sessionStore = await buildSessionStorePostgres(database);

      const cache = new HashMapCache<string, string>();

      return {
        cache,
        sessionStore,
        repositories,
      };
    }

    default: {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "file-system-database"
      );

      const { repositories } = await buildRepositoriesFileSystem(filePath);

      const sessionStore = undefined;

      const cache = new HashMapCache<string, string>();

      return {
        sessionStore,
        repositories,
        cache,
      };
    }
  }
};

/* 


*/

export const buildAppDevelopment = async () => {
  const repositoryImplementation = getRepositoryImplementation();

  const { repositories, cache, sessionStore } = await buildPersistence(
    repositoryImplementation
  );

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
