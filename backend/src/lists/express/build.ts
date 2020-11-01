import express from "express";
import { listItems } from "./list-items";
import { lists } from "./lists";
import { Dependencies } from "./types";

export const buildListsRouter = (dependencies: Dependencies) => (
  router: express.IRouter
) => {
  lists(dependencies)(router);
  listItems(dependencies)(router);
};
