import { IRouter, Handler } from "express";
import { Dependencies } from "../types";
import { AutoListKeys, ListId } from "../../models";
import { TmdbMediaId, TmdbMediaType } from "../../../media/models/types";
import { User } from "../../../users/models";

export const autoLists = ({
  listLogic,
  userLogic,
  middlewares,
}: Dependencies) => (router: IRouter) => {
  router.get(
    "/auto-lists/:autoListKey/list-items",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      const autoListKey = req.params.autoListKey as AutoListKeys;
      const tmdbMediaId = Number(req.query.tmdbMediaId) as TmdbMediaId;
      const tmdbMediaType = req.query.tmdbMediaType as TmdbMediaType;
      const currentUser = req.user as User;
      try {
        const autoList = await listLogic.getAutoList({
          key: autoListKey,
          ownerId: currentUser.id,
        });

        const listItems = await listLogic.getListItemAggergations({
          listId: autoList.id,
          tmdbMediaId,
          tmdbMediaType,
        });

        res.status(200).json(listItems).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/auto-lists/:autoListKey/list-items",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      const autoListKey = req.params.autoListKey as AutoListKeys;
      const tmdbMediaId = req.body.tmdbMediaId as TmdbMediaId;
      const tmdbMediaType = req.body.tmdbMediaType as TmdbMediaType;
      const currentUser = req.user as User;

      try {
        const autoList = await listLogic.getAutoList({
          key: autoListKey,
          ownerId: currentUser.id,
        });
        await listLogic.addListItems([
          {
            userId: currentUser.id,
            listId: autoList.id,
            tmdbMediaId,
            tmdbMediaType,
          },
        ]);
        res.status(201).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/auto-lists/:autoListKey/list-items",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      const autoListKey = req.params.autoListKey as AutoListKeys;
      const tmdbMediaId = Number(req.query.tmdbMediaId) as TmdbMediaId;
      const tmdbMediaType = req.query.tmdbMediaType as TmdbMediaType;
      const currentUser = req.user as User;

      try {
        const autoList = await listLogic.getAutoList({
          key: autoListKey,
          ownerId: currentUser.id,
        });
        const listItem = await listLogic.getListItem({
          listId: autoList.id,
          tmdbMediaId,
          tmdbMediaType,
        });
        await listLogic.removeListItems([listItem]);
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.get("/auto-lists/:listId", async (req, res, next) => {
    try {
      const listId = req.params.listId as ListId;

      const [autoList] = await listLogic.getAutoListAggergations({
        id: listId,
      });

      if (autoList) {
        return res.status(200).json(autoList).end();
      } else {
        return res.status(404).end();
      }
    } catch (error) {
      next(error);
    }
  });

  router.get(
    "/users/:username/auto-lists/:autoListKey",
    async (req, res, next) => {
      try {
        const autoListKey = req.params.autoListKey as AutoListKeys;
        const username = req.params.username as string;

        const user = await userLogic.getUser({ username });

        const [autoList] = await listLogic.getAutoListAggergations({
          key: autoListKey,
          ownerId: user.id,
        });

        if (autoList) {
          res.status(200).json(autoList).end();
        } else {
          res.status(404).json({ message: "Auto list does not exists" }).end();
        }
      } catch (error) {
        next(error);
      }
    }
  );

  router.get("/users/:username/auto-lists", async (req, res, next) => {
    const username = req.params.username as string;
    try {
      const user = await userLogic.getUser({ username });

      const byKey = await listLogic.getAutoListAggergationsByKey({
        ownerId: user.id,
      });

      res.status(200).json(byKey).end();
    } catch (error) {
      next(error);
    }
  });
};
