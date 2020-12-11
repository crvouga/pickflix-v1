import { AxiosRequestConfig } from "axios";
import { Handler } from "express";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import { emailLogicStub } from "../email";
import { createEventEmitter, Events } from "../events";
import { makeExpressApp } from "../express/make-express-app";
import { ExpressAppDependencies } from "../express/types";
import { buildRepositoriesDependingOnTestEnvironment } from "./build-repositories";
import supertest from "supertest";

export const buildLogicTest = async () => {
  const { repositories } = await buildRepositoriesDependingOnTestEnvironment();

  const eventEmitter = createEventEmitter<Events>();

  const mediaLogic = new MediaLogic({
    axios: async (_: AxiosRequestConfig) => ({
      data: {},
    }),
    keyv: {
      set: async (k: any, v: any) => {},
      get: async (k: any) => {},
    },
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

export const buildAppTest = async () => {
  const { appLogic } = await buildLogicTest();

  const userInfo = {
    displayName: "mr test",
    username: "testuser",
    emailAddress: "test@test.com",
    password: "password",
  };

  await appLogic.userLogic.createUserWithPassword(userInfo);

  const currentUser = await appLogic.userLogic.getUser({
    username: userInfo.username,
  });

  const handlerStub: Handler = (req, res, next) => {
    req.user = currentUser;
    next();
  };

  const dependencies: ExpressAppDependencies = {
    ...appLogic,
    middlewares: {
      authenticate: handlerStub,
      isAuthenticated: handlerStub,
    },
  };

  const { app } = makeExpressApp(dependencies);

  const agent = supertest(app);

  return {
    ...dependencies,
    app,
    currentUser,
    agent,
  };
};
