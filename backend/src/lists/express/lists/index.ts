import { IRouter } from "express";
import { pick } from "ramda";
import { User } from "../../../users/models";
import { ListId } from "../../models";
import { Dependencies } from "../types";
import {
  makePaginationOptions,
  makePaginationResponse,
} from "../../../pagination";

export const lists = ({ listLogic, userLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.get("/users/:username/lists", async (req, res, next) => {
    try {
      const username = req.params.username as string;
      const paginationOptions = makePaginationOptions({
        page: req.query.page,
      });

      const user = await userLogic.getUser({ username });

      const listAggergations = await listLogic.getListAggergations(
        {
          ownerId: user.id,
        },
        paginationOptions
      );

      res
        .status(200)
        .json(
          makePaginationResponse({
            ...paginationOptions,
            results: listAggergations,
          })
        )
        .end();
    } catch (error) {
      res.status(400).json({ error }).end();
    }
  });

  router.get("/lists/:listId", async (req, res, next) => {
    try {
      const listId = req.params.listId as ListId;

      const [list] = await listLogic.getListAggergations({
        id: listId,
      });

      if (list) {
        return res.status(200).json(list).end();
      } else {
        return res.status(404).end();
      }
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

  router.delete("/lists/:listId", async (req, res, next) => {
    try {
      const listId = req.params.listId as ListId;

      await listLogic.removeLists([{ id: listId }]);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });
};
