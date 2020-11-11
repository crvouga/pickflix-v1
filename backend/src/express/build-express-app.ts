import bodyParser from "body-parser";
import express, { Application, ErrorRequestHandler } from "express";
import path from "path";
import configuration from "../configuration";
import { buildAuthMiddleware } from "../users/express/build-auth-middleware";
import { buildApiRouter } from "./build-api-router";
import { ExpressAppDependencies } from "./types";

const buildMiddleware = (dependencies: ExpressAppDependencies) => (
  app: Application
) => {
  app.use(bodyParser.json());

  buildAuthMiddleware(dependencies)(app);
};

const buildFrontendRouter = () => (app: Application) => {
  app.use(express.static(configuration.PATH_TO_FRONTEND));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(configuration.PATH_TO_FRONTEND, "index.html"));
  });
};

//@ts-ignore
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    res.status(400).json(err).end();
  } else {
    next();
  }
};

export const buildExpressApp = (dependencies: ExpressAppDependencies) => (
  app: Application
) => {
  buildMiddleware(dependencies)(app);

  buildApiRouter(dependencies)(app);

  buildFrontendRouter()(app);

  app.use(errorHandler);

  return {
    app,
  };
};
