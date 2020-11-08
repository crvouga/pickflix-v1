import express from "express";
import { TmdbMediaId, TmdbMediaType } from "../../../media/models/types";
import { User } from "../../../users/models";
import { ListId, ListItemId } from "../../models";
import { Dependencies } from "../types";

export const listItems = ({ listLogic, middlewares }: Dependencies) => (
  router: express.IRouter
) => {
  router.get("/lists/:listId/list-items", async (req, res, next) => {
    try {
      const listId = req.params.listId as ListId;
      const listItemAggergations = await listLogic.getListItemAggergations({
        listId,
      });
      res.status(200).json(listItemAggergations).end();
    } catch (error) {
      next(error);
    }
  });

  router.post(
    "/lists/:listId/list-items",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const user = req.user as User;
        const { tmdbMediaId, tmdbMediaType } = req.body;
        const listId = req.params.listId as ListId;

        const [added] = await listLogic.addListItems([
          {
            userId: user.id,
            listId,
            tmdbMediaId,
            tmdbMediaType,
          },
        ]);

        res.status(201).json(added).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/lists/:listId/list-items",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const listItemIds = req.body as ListItemId[];

        const listId = req.params.listId as ListId;

        await listLogic.removeListItems(
          listItemIds.map((listItemId) => ({ listId: listId, id: listItemId }))
        );

        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
