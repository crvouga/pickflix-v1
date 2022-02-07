import express from "express";
import { useListsRouter } from "../../lists/express";
import { useMediaRouter } from "../../media/express/build";
import { useReviewsRouter } from "../../reviews/express";
import { useAuthRouter, useUsersRouter } from "../../users/express";
import { ExpressAppDependencies } from "./types";

export const useApiRouter = (dependencies: ExpressAppDependencies) =>
  (
    app: express.IRouter,
  ) => {
    const router = express.Router();

    for (
      const buildRouter of [
        useListsRouter,
        useMediaRouter,
        useReviewsRouter,
        useAuthRouter,
        useUsersRouter,
      ]
    ) {
      buildRouter(dependencies)(router);
    }

    app.use("/api", router);
  };
