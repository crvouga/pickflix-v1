import { IRouter } from "express";
import {
  castMediaId,
  MediaId,
  TmdbMediaId,
  TmdbMediaType,
} from "../../../media/models/types";
import { castUser, castUsername, User } from "../../../users/models";
import { AutoListKeys, ListId } from "../../models";
import { Dependencies } from "../types";

export const autoLists = ({
  listLogic,
  userLogic,
  middlewares,
}: Dependencies) => (router: IRouter) => {
  router.get("/auto-lists", middlewares.isAuthenticated, async (req, res) => {
    try {
      const currentUser = castUser(req.user);
      const autoLists = await listLogic.getAutoListAggergations({
        ownerId: currentUser.id,
      });
      res.status(200).json(autoLists).end();
    } catch (error) {
      res.status(400).json({ error }).end();
    }
  });

  router.post(
    "/auto-lists/:autoListKey/list-items",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      const autoListKey = req.params.autoListKey as AutoListKeys;
      const mediaId = req.body.mediaId as MediaId;
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
            mediaId,
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

  router.get(
    "/auto-lists/:autoListKey",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      const currentUser = req.user as User;
      const autoListKey = req.params.autoListKey as AutoListKeys;
      const mediaId = castMediaId({
        tmdbMediaId: req.params.tmdbMediaId,
        tmdbMediaType: req.params.tmdbMediaType,
      });

      try {
        const autoList = await listLogic.getAutoList({
          key: autoListKey,
          ownerId: currentUser.id,
        });

        const listItems = await listLogic.getListItemAggergations({
          listId: autoList.id,
          mediaId,
        });

        res.status(200).json(listItems).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/users/:username/auto-lists/:autoListKey/list-items",
    async (req, res, next) => {
      const autoListKey = req.params.autoListKey as AutoListKeys;
      const username = castUsername(req.params.username);
      const mediaId = castMediaId({
        tmdbMediaId: req.query.tmdbMediaId,
        tmdbMediaType: req.query.tmdbMediaType,
      });
      try {
        const user = await userLogic.getUser({ username });

        const autoList = await listLogic.getAutoList({
          key: autoListKey,
          ownerId: user.id,
        });

        const listItems = await listLogic.getListItemAggergations({
          listId: autoList.id,
          mediaId,
        });

        res.status(200).json(listItems).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
