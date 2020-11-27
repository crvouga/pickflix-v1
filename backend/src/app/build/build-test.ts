import { AxiosRequestConfig } from "axios";
import { Handler } from "express";
import { ListLogic } from "../../lists/logic/logic";
import { AutoListRepositoryHashMap } from "../../lists/repositories/auto-list-repository";
import { ListItemRepositoryHashMap } from "../../lists/repositories/list-item-repository";
import { ListRepositoryHashMap } from "../../lists/repositories/list-repository";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { ReviewRepositoryHashMap } from "../../reviews/repositories/review-repository";
import { ReviewVoteRepositoryHashMap } from "../../reviews/repositories/review-vote-repository";
import { UserLogic } from "../../users/logic/logic";
import { makeUserFake } from "../../users/models/make-user.fake";
import { CredentialRepositoryHashMap } from "../../users/repositories/credential-repository";
import { UserRepositoryHashMap } from "../../users/repositories/user-repository";
import { emailLogicStub } from "../email";
import { createEventEmitter, Events } from "../events";
import { makeExpressApp } from "../express/make-express-app";
import { ExpressAppDependencies } from "../express/types";

export const buildRepositoriesTest = () => {
  const userRepository = new UserRepositoryHashMap();
  const credentialRepository = new CredentialRepositoryHashMap();
  const reviewRepository = new ReviewRepositoryHashMap({});
  const reviewVoteRepository = new ReviewVoteRepositoryHashMap({});
  const listRepository = new ListRepositoryHashMap();
  const listItemRepository = new ListItemRepositoryHashMap();
  const autoListRepository = new AutoListRepositoryHashMap();

  return {
    userRepository,
    credentialRepository,
    reviewRepository,
    reviewVoteRepository,
    listRepository,
    listItemRepository,
    autoListRepository,
  };
};

export const buildLogicTest = () => {
  const repositories = buildRepositoriesTest();

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
