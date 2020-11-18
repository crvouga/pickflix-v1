import { IRouter } from "express";
import { pick } from "ramda";
import { User, castUsername, castUserId } from "../../../users/models";
import { ListId, castListId } from "../../models";
import { Dependencies } from "../types";
import {
  makePaginationOptions,
  makePaginationResponse,
} from "../../../pagination";

export const lists = ({ listLogic, userLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.get("/lists", async (req, res) => {
    try {
      const ownerId = req.query.ownerId
        ? castUserId(req.query.ownerId)
        : req.user
        ? castUserId(req.user.id)
        : undefined;

      const id = req.query.id ? castListId(req.query.id) : undefined;

      const page = req.query.page ? req.query.page : 1;

      const paginationOptions = makePaginationOptions({
        page,
      });

      const listAggergations = await listLogic.getListAggergations(
        {
          id,
          ownerId,
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
