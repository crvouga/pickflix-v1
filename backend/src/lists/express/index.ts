import express from "express";
import { autoLists } from "./auto-lists";
import { listItems } from "./list-items";
import { lists } from "./lists";
import { Dependencies } from "./types";

export const useListsRouter = (dependencies: Dependencies) => (
  router: express.IRouter
) => {
  lists(dependencies)(router);
  listItems(dependencies)(router);
  autoLists(dependencies)(router);
};
