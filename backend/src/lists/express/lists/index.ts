import { IRouter } from "express";
import { isNullOrUndefined } from "util";
import {
  makePaginationOptions,
  makePaginationResponse,
} from "../../../app/pagination";
import { removeNullOrUndefinedEntries } from "../../../app/utils";
import { castUserId, UserId } from "../../../users/models";
import {
  castListDescription,
  castListId,
  castListTitle,
  ListId,
} from "../../models";
import { Dependencies } from "../types";

export const lists = ({ listLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  /* 
    
    NOTE: list id take presedence over owner id 

  */
  router.get("/lists", async (req, res) => {
    try {
      const userId = req.query.ownerId
        ? castUserId(req.query.ownerId)
        : req.user
        ? castUserId(req.user.id)
        : undefined;

      const id = req.query.id ? castListId(req.query.id) : undefined;

      const spec: { id: ListId } | { userId: UserId } | undefined = id
        ? {
            id,
          }
        : userId
        ? {
            userId,
          }
        : undefined;

      if (!spec) {
        throw new Error("invalid list query");
      }

      const paginationOptions = makePaginationOptions({
        page: req.query.page,
      });

      const listAggergations = await listLogic.getListAggergations(spec, {
        pagination: paginationOptions,
        orderBy: [["updatedAt", "descend"]],
      });

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
        const listId = castListId(req.params.listId);

        const title = isNullOrUndefined(req.body.title)
          ? undefined
          : castListTitle(req.body.title);

        const description = isNullOrUndefined(req.body.description)
          ? undefined
          : castListDescription(req.body.description);

        const edits = removeNullOrUndefinedEntries({
          title,
          description,
        });

        const editedList = await listLogic.editList({
          id: listId,
          ...edits,
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
