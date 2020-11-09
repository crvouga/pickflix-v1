import express from "express";
import {
  TmdbMediaId,
  TmdbMediaType,
  TmdbMedia,
} from "../../../media/models/types";
import { User } from "../../../users/models";
import { ListId, ListItemId } from "../../models";
import { Dependencies } from "../types";
import { composeP } from "ramda";

export const listItems = ({ listLogic, middlewares }: Dependencies) => (
  router: express.IRouter
) => {
  router.get("/list-items", async (req, res, next) => {
    try {
      const listId = req.query.listId as ListId | undefined;
      const tmdbMediaId = Number(req.query.tmdbMediaId) as
        | TmdbMediaId
        | undefined;
      const tmdbMediaType = req.query.tmdbMediaType as
        | TmdbMediaType
        | undefined;

      if (listId && tmdbMediaId && tmdbMediaType) {
        const listItems = await listLogic.getListItemAggergations({
          listId,
          tmdbMediaId,
          tmdbMediaType,
        });
        return res.status(200).json(listItems).end();
      }
      if (listId) {
        const listItems = await listLogic.getListItemAggergations({
          listId,
        });
        return res.status(200).json(listItems).end();
      }

      return res.status(404).end();
    } catch (error) {
      next(error);
    }
  });

  router.post(
    "/list-items",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const authenticatedUser = req.user as User;
        const { listId, tmdbMediaId, tmdbMediaType } = req.body;

        const [added] = await listLogic.addListItems([
          {
            userId: authenticatedUser.id,
            listId,
            tmdbMediaId,
            tmdbMediaType,
          },
        ]);

        res.status(201).json(added).end();
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );

  router.delete(
    "/list-items",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const listItemInfos = req.body as (
          | { id: ListItemId }
          | {
              listId: ListId;
              tmdbMediaId: TmdbMediaId;
              tmdbMediaType: TmdbMediaType;
            }
        )[];

        await listLogic.removeListItems(listItemInfos);

        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
