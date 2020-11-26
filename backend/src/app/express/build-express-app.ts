import bodyParser from "body-parser";
import express, { Application, ErrorRequestHandler } from "express";
import path from "path";
import { buildAuthMiddleware } from "../../users/express/build-auth-middleware";
import configuration from "../configuration";
import { buildApiRouter } from "./build-api-router";
import { ExpressAppDependencies } from "./types";
import { buildSecurityMiddleware } from "./build-security-middleware";

const buildMiddleware = (dependencies: ExpressAppDependencies) => (
  app: Application
) => {
  app.use(bodyParser.json());

  buildAuthMiddleware(dependencies)(app);
  buildSecurityMiddleware(dependencies)(app);
};

const buildFrontendRouter = () => (app: Application) => {
  app.use(express.static(configuration.PATH_TO_FRONTEND_BUILD));

  app.get("*", (req, res) => {
    res.sendFile(path.join(configuration.PATH_TO_FRONTEND_BUILD, "index.html"));
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error) {
    return res
      .status(400)
      .json({
        message: "There was an error",
        error,
      })
      .end();
  } else {
    next();
  }
};

export const buildExpressApp = (dependencies: ExpressAppDependencies) => {
  const app = express();

  buildMiddleware(dependencies)(app);

  buildApiRouter(dependencies)(app);

  buildFrontendRouter()(app);

  app.use(errorHandler);

  return app;
};
