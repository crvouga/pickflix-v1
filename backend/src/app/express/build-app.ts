import bodyParser from "body-parser";
import express, { ErrorRequestHandler } from "express";
import { useApiRouter } from "./api-router";
import { useAuthenticationMiddleware } from "./authentication-middleware";
import { useFrontendRouter } from "./frontend-router";
import { useSecurityMiddleware } from "./security-middleware";
import { useSessionMiddleware } from "./session-middleware";
import { ExpressAppDependencies } from "./types";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error) {
    return res
      .status(400)
      .json({
        message: "There was an error",
        error: error.toString(),
      })
      .end();
  } else {
    next();
  }
};

export const buildExpressApp = async (dependencies: ExpressAppDependencies) => {
  const app = express();

  app.use(bodyParser.json());

  await useSessionMiddleware()(app);

  await useAuthenticationMiddleware(dependencies)(app);

  await useSecurityMiddleware(dependencies)(app);

  await useApiRouter(dependencies)(app);

  await useFrontendRouter()(app);

  app.use(errorHandler);

  return {
    app,
  };
};
