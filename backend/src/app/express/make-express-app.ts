import bodyParser from "body-parser";
import express, { Application, ErrorRequestHandler } from "express";
import path from "path";
import configuration from "../configuration";
import { useApiRouter } from "./api-router";
import { useAuthenticationMiddleware } from "./authentication-middleware";
import { useSecurityMiddleware } from "./security-middleware";
import { ExpressAppDependencies } from "./types";

const useMiddleware = (dependencies: ExpressAppDependencies) => (
  app: Application
) => {
  app.use(bodyParser.json());

  useAuthenticationMiddleware(dependencies)(app);

  useSecurityMiddleware(dependencies)(app);
};

const useFrontendRouter = () => (app: Application) => {
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
        error: JSON.stringify(error),
      })
      .end();
  } else {
    next();
  }
};

export const makeExpressApp = (dependencies: ExpressAppDependencies) => {
  const app = express();

  useMiddleware(dependencies)(app);

  useApiRouter(dependencies)(app);

  useFrontendRouter()(app);

  app.use(errorHandler);

  return {
    app,
  };
};
