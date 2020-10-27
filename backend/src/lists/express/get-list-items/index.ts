import { IRouter } from "express";
import { ListId } from "../../models/types";
import { Dependencies } from "../types";

export const getListItems = ({ listLogic }: Dependencies) => (
  router: IRouter
) => {
  router.get("/lists/:listId/list-items", async (req, res, next) => {
    try {
      const listId = req.params.listId as ListId;
      const listItems = await listLogic.getListItems({ listId });
      res.json(listItems);
    } catch (error) {
      next(error);
    }
  });
};
