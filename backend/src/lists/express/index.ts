import express from "express";
import { autoLists } from "./auto-lists";
import { listItems } from "./list-items";
import { lists } from "./lists";
import { permissions } from "./permissions";
import { Dependencies } from "./types";

export const useListsRouter = (dependencies: Dependencies) => (
  router: express.IRouter
) => {
  permissions(dependencies)(router);
  lists(dependencies)(router);
  listItems(dependencies)(router);
  autoLists(dependencies)(router);
};
