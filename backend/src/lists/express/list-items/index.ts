import express from "express";
import {
  castMediaId,
  TmdbMediaId,
  TmdbMediaType,
  MediaId,
} from "../../../media/models/types";
import { castListId, ListId, ListItemId, castListItemId } from "../../models";
import { Dependencies } from "../types";
import { castUser } from "../../../users/models";

export const listItems = ({ listLogic, middlewares }: Dependencies) => (
  router: express.IRouter
) => {
  router.get("/list-items", async (req, res) => {
    try {
      const listId =
        "listId" in req.query ? castListId(req.query.listId) : undefined;

      const mediaId =
        "tmdbMediaId" in req.query && "tmdbMediaType" in req.query
          ? castMediaId({
              tmdbMediaId: req.query.tmdbMediaId,
              tmdbMediaType: req.query.tmdbMediaType,
            })
          : undefined;

      if (listId && mediaId) {
        const listItems = await listLogic.getListItemAggergations({
          listId,
          mediaId,
        });
        return res.status(200).json(listItems).end();
      }

      if (listId) {
        const listItems = await listLogic.getListItemAggergations({
          listId,
        });
        return res.status(200).json(listItems).end();
      }

      return res.status(400).json({ message: "invalid query" }).end();
    } catch (error) {
      res.status(400).json({ error }).end();
    }
  });

  router.post("/list-items", middlewares.isAuthenticated, async (req, res) => {
    try {
      const user = castUser(req.user);
      const listId = castListId(req.body.listId);
      const mediaId = castMediaId(req.body.mediaId);

      const [added] = await listLogic.addListItems([
        {
          userId: user.id,
          listId,
          mediaId,
        },
      ]);

      res.status(201).json(added).end();
    } catch (error) {
      res.status(400).json({ error }).end();
    }
  });

  const castListItemInfo = (
    listItemInfo: any
  ): { id: ListItemId } | { listId: ListId; mediaId: MediaId } => {
    if (listItemInfo && "id" in listItemInfo) {
      return {
        id: castListItemId(listItemInfo.id),
      };
    }
    if (listItemInfo && "listId" in listItemInfo && "mediaId" in listItemInfo) {
      return {
        listId: castListId(listItemInfo.listId),
        mediaId: castMediaId(listItemInfo.mediaId),
      };
    }
    throw new Error("failed to cast listItemInfo");
  };

  router.delete(
    "/list-items",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        if (!Array.isArray(req.body)) {
          throw new Error("request body must be an array");
        }

        const listItemInfos = req.body.map(castListItemInfo);

        await listLogic.removeListItems(listItemInfos);

        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error }).end();
      }
    }
  );
};
