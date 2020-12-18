import bodyParser from "body-parser";
import express, { Application, ErrorRequestHandler } from "express";
import path from "path";
import { useApiRouter } from "./api-router";
import { useAuthenticationMiddleware } from "./authentication-middleware";
import { useSecurityMiddleware } from "./security-middleware";
import { useSessionMiddleware } from "./session-middleware";
import { ExpressAppDependencies } from "./types";

const FRONTEND_BUILD_PATH = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "frontend",
  "build"
);

const useFrontendRouter = () => (app: Application) => {
  app.use(express.static(FRONTEND_BUILD_PATH));

  app.get("*", (req, res) => {
    res.sendFile(path.join(FRONTEND_BUILD_PATH, "index.html"));
  });
};

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

  await useSessionMiddleware(dependencies)(app);

  await useAuthenticationMiddleware(dependencies)(app);

  await useSecurityMiddleware(dependencies)(app);

  await useApiRouter(dependencies)(app);

  await useFrontendRouter()(app);

  app.use(errorHandler);

  return {
    app,
  };
};
