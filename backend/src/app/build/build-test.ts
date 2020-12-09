import { AxiosRequestConfig } from "axios";
import { Handler } from "express";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import { makeUserFake } from "../../users/models/make-user.fake";
import { emailLogicStub } from "../email";
import { createEventEmitter, Events } from "../events";
import { makeExpressApp } from "../express/make-express-app";
import { ExpressAppDependencies } from "../express/types";
import { buildRepositoriesHashMap } from "./build-repositories";

export const buildLogicTest = () => {
  const { repositories } = buildRepositoriesHashMap();

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

  return {
    eventEmitter,
    userLogic,
    mediaLogic,
    listLogic,
    reviewLogic,
  };
};

export const buildAppTest = async () => {
  const appLogic = buildLogicTest();

  const currentUser = makeUserFake();

  appLogic.userLogic.userRepository.add(currentUser);

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

  return {
    ...dependencies,
    app,
    currentUser,
  };
};
