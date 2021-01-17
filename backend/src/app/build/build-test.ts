import { AxiosRequestConfig } from "axios";
import { Handler } from "express";
import supertest from "supertest";
import { getRepositoryImplementation } from "../../config";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import { FAKE_USER_INFO } from "../../users/models";
import { HashMapCache } from "../persistence/cache/cache.hash-map";
import { PostgresDatabase } from "../persistence/postgres/database.postgres";
import { emailLogicStub } from "../../users/email";
import { createEventEmitter, Events } from "../../common/events";
import { buildExpressApp } from "../express/build-app";
import { ExpressAppDependencies } from "../express/types";
import {
  buildRepositoriesHashMap,
  buildRepositoriesPostgres,
} from "./build-repositories";

/* 


*/

export const POSTGRES_TEST_CONFIG = {
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "pickflix_test",
};

/* 


*/

export const buildPersistencePostgres = async () => {
  const database = new PostgresDatabase(POSTGRES_TEST_CONFIG);

  const { repositories, initializeAllTables } = await buildRepositoriesPostgres(
    database
  );

  await initializeAllTables();

  const sessionStore = undefined;

  const cache = new HashMapCache<string, string>();

  return {
    cache,
    sessionStore,
    repositories,
  };
};

const buildPersistenceDefault = async () => {
  const { repositories } = await buildRepositoriesHashMap();

  const sessionStore = undefined;

  const cache = new HashMapCache<string, string>();

  return {
    sessionStore,
    repositories,
    cache,
  };
};

export const buildPersistence = async () => {
  switch (getRepositoryImplementation()) {
    case "postgres":
      return buildPersistencePostgres();

    default:
      return buildPersistenceDefault();
  }
};

/* 


*/

export const buildAppTest = async () => {
  const { repositories } = await buildPersistence();

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
    sessionStore: undefined,
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
