import sgMail from "@sendgrid/mail";
import axios from "axios";
import { ListLogic } from "../../lists/logic/logic";
import { AutoListRepositoryFileSystem } from "../../lists/repositories/auto-list-repository";
import { ListItemRepositoryFileSystem } from "../../lists/repositories/list-item-repository";
import { ListRepositoryFileSystem } from "../../lists/repositories/list-repository";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { ReviewRepositoryFileSystem } from "../../reviews/repositories/review-repository";
import { ReviewVoteRepositoryFileSystem } from "../../reviews/repositories/review-vote-repository";
import { UserLogic } from "../../users/logic/logic";
import { CredentialRepositoryFileSystem } from "../../users/repositories/credential-repository";
import { UserRepositoryFileSystem } from "../../users/repositories/user-repository";
import keyv from "../data-access/mongodb/keyv";
import { EmailLogic } from "../email";
import { createEventEmitter, Events } from "../events";
import {
  authenticate,
  isAuthenticated,
} from "../express/authentication-middleware";
import { makeExpressApp } from "../express/make-express-app";
import { ExpressAppDependencies } from "../express/types";

export const buildRepositoriesProduction = () => {
  const userRepository = new UserRepositoryFileSystem();
  const credentialRepository = new CredentialRepositoryFileSystem();
  const reviewRepository = new ReviewRepositoryFileSystem();
  const reviewVoteRepository = new ReviewVoteRepositoryFileSystem();
  const listRepository = new ListRepositoryFileSystem();
  const listItemRepository = new ListItemRepositoryFileSystem();
  const autoListRepository = new AutoListRepositoryFileSystem();

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

export const buildLogicProduction = () => {
  const repositories = buildRepositoriesProduction();

  const eventEmitter = createEventEmitter<Events>();

  const mediaLogic = new MediaLogic({ axios, keyv });

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

export const buildAppProduction = async () => {
  const appLogic = buildLogicProduction();

  const dependencies: ExpressAppDependencies = {
    ...appLogic,
    middlewares: {
      authenticate,
      isAuthenticated,
    },
  };

  const { app } = makeExpressApp(dependencies);

  return {
    app,
  };
};
