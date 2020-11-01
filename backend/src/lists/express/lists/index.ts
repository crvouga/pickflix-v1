import { IRouter } from "express";
import { ListId } from "../../models/types";
import { Dependencies } from "../types";
import { User } from "../../../users/models";
import { pick } from "ramda";

export const lists = ({ listLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.get("/lists", middlewares.isAuthenticated, async (req, res, next) => {
    try {
      const currentUser = req.user as User;

      const listInfo = {
        ownerId: currentUser?.id,
      };

      const lists = await listLogic.getLists(listInfo);

      res.json(lists).end();
    } catch (error) {
      next(error);
    }
  });

  router.get("/lists/:listId", async (req, res, next) => {
    try {
      const listId = req.params.listId as ListId;

      const lists = await listLogic.getLists({ id: listId });

      if (lists.length > 0) {
        const [list] = lists;

        return res.json(list);
      }

      const autoLists = await listLogic.getAutoLists({ id: listId });

      if (autoLists.length > 0) {
        const [autoList] = autoLists;

        return res.json(autoList);
      }

      return res.status(404).end();
    } catch (error) {
      return next(error);
    }
  });

  router.patch(
    "/lists/:listId",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const listId = req.params.listId as ListId;

        const edits = pick(["title", "description"], req.body);

        const [editedList] = await listLogic.editLists([
          { id: listId, ...edits },
        ]);

        res.json(editedList).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.post("/lists", middlewares.isAuthenticated, async (req, res, next) => {
    try {
      const user = req.user as User;
      const title = req.body.title as string;
      const description = req.body.description as string;

      const [list] = await listLogic.addLists([
        {
          ownerId: user.id,
          title,
          description,
        },
      ]);

      res.status(201).json(list);
    } catch (error) {
      next(error);
    }
  });

  router.delete(
    "/lists/:listId",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const listId = req.params.listId as ListId;

        await listLogic.removeLists([{ id: listId }]);

        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
