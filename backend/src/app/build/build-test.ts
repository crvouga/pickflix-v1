import { AxiosRequestConfig } from "axios";
import { Handler } from "express";
import supertest from "supertest";
import { getRepositoryImplementation } from "../../config";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import { FAKE_USER_INFO } from "../../users/models";
import { HashMapCache } from "../data-store/cache/cache.hash-map";
import {
  clearTables,
  PostgresDatabase,
} from "../data-store/repository/postgres/database.postgres";
import { emailLogicStub } from "../email";
import { createEventEmitter, Events } from "../events";
import { buildExpressApp } from "../express/build-app";
import { ExpressAppDependencies } from "../express/types";
import {
  buildRepositoriesHashMap,
  buildRepositoriesPostgres,
} from "./build-repositories";

/* 


*/

export const postgresDatabaseTest = new PostgresDatabase({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "pickflix_test",
});

export const buildRepositoriesTest = async () => {
  switch (getRepositoryImplementation()) {
    case "postgres":
      await clearTables(postgresDatabaseTest);

      const {
        repositories,
        initializeAllTables,
      } = await buildRepositoriesPostgres(postgresDatabaseTest);

      await initializeAllTables();

      return {
        repositories,
      };

    default:
      return buildRepositoriesHashMap();
  }
};

/* 


*/

export const buildLogicTest = async () => {
  const { repositories } = await buildRepositoriesTest();

  const eventEmitter = createEventEmitter<Events>();

  const mediaLogic = new MediaLogic({
    ...repositories,
    axios: async (_: AxiosRequestConfig) => ({
      data: {},
    }),
    cache: new HashMapCache(),
  });

  const listLogic = new ListLogic({
    ...repositories,
    eventEmitter,
    mediaLogic,
  });

  const userLogic = new UserLogic({
    ...repositories,
    eventEmitter,
    emailLogic: emailLogicStub,
  });

  const reviewLogic = new ReviewLogic({
    ...repositories,
    mediaLogic,
  });

  const appLogic = {
    eventEmitter,
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

export const buildAppTest = async () => {
  const { appLogic } = await buildLogicTest();

  await appLogic.userLogic.createUserWithPassword(FAKE_USER_INFO);

  const currentUser = await appLogic.userLogic.getUser({
    username: FAKE_USER_INFO.username,
  });

  const handlerStub: Handler = (req, res, next) => {
    req.user = currentUser;
    next();
  };

  const dependencies: ExpressAppDependencies = {
    ...appLogic,
    postgresDatabase: postgresDatabaseTest,
    middlewares: {
      authenticate: handlerStub,
      isAuthenticated: handlerStub,
    },
  };

  const { app } = await buildExpressApp(dependencies);

  const agent = supertest(app);

  return {
    ...dependencies,
    app,
    currentUser,
    agent,
  };
};
