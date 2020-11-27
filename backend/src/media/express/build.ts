import express from "express";
import { tmdb } from "./tmdb";
import { Dependencies } from "./types";
import { youtube } from "./youtube";

const buildRouterList = [tmdb, youtube];

export const useMediaRouter = (dependencies: Dependencies) => (
  router: express.IRouter
) => {
  for (const buildRouter of buildRouterList) {
    buildRouter(dependencies)(router);
  }
};
