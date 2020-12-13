import sgMail from "@sendgrid/mail";
import axios from "axios";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import keyv from "../data-access/keyv.mongo";
import { EmailLogic } from "../email";
import { createEventEmitter, Events } from "../events";
import {
  authenticate,
  isAuthenticated,
} from "../express/authentication-middleware";
import { makeExpressApp } from "../express/make-express-app";
import { ExpressAppDependencies } from "../express/types";
import { buildRepositoriesDependingOnDevelopmentEnvironment } from "./build-repositories";

export const buildLogicDevelopment = async () => {
  const {
    repositories,
  } = await buildRepositoriesDependingOnDevelopmentEnvironment();

  const eventEmitter = createEventEmitter<Events>();

  const mediaLogic = new MediaLogic({ ...repositories, axios, keyv });

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

export const buildAppDevelopment = async () => {
  const { appLogic } = await buildLogicDevelopment();

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
