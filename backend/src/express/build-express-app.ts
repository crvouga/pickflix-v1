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
  app.use(express.static(configuration.PATH_TO_FRONTEND_BUILD));

  app.get("*", (req, res) => {
    res.sendFile(path.join(configuration.PATH_TO_FRONTEND_BUILD, "index.html"));
  });
};

export const buildExpressApp = (dependencies: ExpressAppDependencies) => (
  app: Application
) => {
  buildMiddleware(dependencies)(app);

  buildApiRouter(dependencies)(app);

  buildFrontendRouter()(app);

  return {
    app,
  };
};
