import express, { query } from "express";
import {
  castMediaId,
  TmdbMediaId,
  TmdbMediaType,
  MediaId,
} from "../../../media/models/types";
import { castListId, ListId, ListItemId, castListItemId } from "../../models";
import { Dependencies } from "../types";
import { castUser, castUserId } from "../../../users/models";
import {
  makePaginationOptions,
  makePaginationResponse,
  castArray,
} from "../../../app/pagination";

export const listItems = ({ listLogic, middlewares }: Dependencies) => (
  router: express.IRouter
) => {
  /* 
    
    NOTE: list id take presedence over user id 

  */
  router.get("/list-items", async (req, res) => {
    try {
      const userId = req.user ? castUserId(req.user.id) : undefined;

      const listId = req.query.listId
        ? castListId(req.query.listId)
        : undefined;

      const mediaId =
        req.query.tmdbMediaId && req.query.tmdbMediaType
          ? castMediaId({
              tmdbMediaId: req.query.tmdbMediaId,
              tmdbMediaType: req.query.tmdbMediaType,
            })
          : undefined;

      const listInfo = listId
        ? {
            listId,
            mediaId,
          }
        : {
            mediaId,
            userId,
          };

      const paginationOptions = makePaginationOptions({
        page: req.query.page,
      });

      const listItems = await listLogic.getListItemAggergations(
        listInfo,
        paginationOptions
      );

      return res
        .status(200)
        .json(
          makePaginationResponse({
            ...paginationOptions,
            results: listItems,
          })
        )
        .end();
    } catch (error) {
      res.status(400).json({ error }).end();
    }
  });

  router.post(
    "/list-items/lists",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        const userId = castUserId(req.user?.id);
        const mediaId = castMediaId(req.body.mediaId);
        const listIds = castArray(req.body.listIds).map(castListId);
        await listLogic.setListItems({ userId, mediaId, listIds });
      } catch (error) {
        res.status(400).json({ error: error.toString() }).end();
      }
    }
  );

  router.post(
    "/list-items/toggle",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        const userId = castUserId(req.user?.id);
        const listId = castListId(req.body.listId);
        const mediaId = castMediaId(req.body.mediaId);

        const isAdded = await listLogic.toggleListItem({
          userId,
          listId,
          mediaId,
        });

        res.status(201).json(isAdded).end();
      } catch (error) {
        res
          .status(400)
          .json({ error: error.toString(), message: "failed to add list item" })
          .end();
      }
    }
  );

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
      res
        .status(400)
        .json({ error: error.toString(), message: "failed to add list item" })
        .end();
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
        res
          .status(400)
          .json({
            error: error.toString(),
            message: "failed to delete list item",
          })
          .end();
      }
    }
  );
};
