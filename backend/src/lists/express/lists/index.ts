import { IRouter } from "express";
import { isNullOrUndefined } from "util";
import {
  makePaginationOptions,
  makePaginationResponse,
  Paginated,
} from "../../../app/pagination";
import { castUserId } from "../../../users/models";
import { castListDescription, castListId, castListTitle } from "../../models";
import { Dependencies } from "../types";
import { ListAggergation } from "../../models/types";

export type GetListsResponse = Paginated<ListAggergation>;

export const lists = ({ listLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.get("/lists", async (req, res) => {
    try {
      const userId = req.query.userId
        ? castUserId(req.query.userId)
        : undefined;

      const editorId = req.query.editorId
        ? castUserId(req.query.editorId)
        : undefined;

      const ownerId = req.query.ownerId
        ? castUserId(req.query.ownerId)
        : undefined;

      const listId = req.query.listId
        ? castListId(req.query.listId)
        : undefined;

      const spec = {
        listId,
        userId,
        editorId,
        ownerId,
      };

      const paginationOptions = makePaginationOptions({
        page: req.query.page,
      });

      const lists = await listLogic.getListsFromSpec(spec, {
        pagination: paginationOptions,
        orderBy: [["updatedAt", "descend"]],
      });

      const results = await Promise.all(
        lists.map((list) => listLogic.aggergateList(list))
      );

      const response: GetListsResponse = makePaginationResponse({
        ...paginationOptions,
        results,
      });

      res.status(200).json(response).end();
    } catch (error) {
      res.status(400).json({ error: error.toString() }).end();
    }
  });

  router.patch(
    "/lists/:listId",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const userId = castUserId(req.user?.id);

        const listId = castListId(req.params.listId);

        const title = isNullOrUndefined(req.body.title)
          ? undefined
          : castListTitle(req.body.title);

        const description = isNullOrUndefined(req.body.description)
          ? undefined
          : castListDescription(req.body.description);

        const editedList = await listLogic.editList({
          userId,
          listId,
          edits: {
            title,
            description,
          },
        });

        res.status(204).json(editedList).end();
      } catch (error) {
        res.status(400).json({ error, message: "failed to patch list" }).end();
      }
    }
  );

  router.post("/lists", middlewares.isAuthenticated, async (req, res, next) => {
    try {
      const ownerId = castUserId(req.user?.id);

      const title = castListTitle(req.body.title || "");

      const description = castListDescription(req.body.description || "");

      const list = await listLogic.addList({
        ownerId: ownerId,
        title,
        description,
      });

      res.status(201).json(list);
    } catch (error) {
      res.status(400).json({ error, message: "failed to post list" }).end();
    }
  });

  router.delete(
    "/lists/:listId",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        const userId = castUserId(req.user?.id);
        const listId = castListId(req.params.listId);

        await listLogic.removeList({ userId, listId });

        res.status(204).end();
      } catch (error) {
        res
          .status(400)
          .json({ error: error.toString(), message: "failed to delete list" })
          .end();
      }
    }
  );
};
