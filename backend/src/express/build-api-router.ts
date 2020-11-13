import express from "express";
import { buildListsRouter } from "../lists/express/build";
import { buildMediaRouter } from "../media/express/build";
import { buildReviewsRouter } from "../reviews/express/build";
import { buildAuthRouter, buildUsersRouter } from "../users/express/build";
import { ExpressAppDependencies } from "./types";

const buildRouterList = [
  buildListsRouter,
  buildMediaRouter,
  buildReviewsRouter,
  buildAuthRouter,
  buildUsersRouter,
];

export const buildApiRouter = (dependencies: ExpressAppDependencies) => (
  app: express.IRouter
) => {
  const router = express.Router();

  for (const buildRouter of buildRouterList) {
    buildRouter(dependencies)(router);
  }

  app.use("/api", router);
};
