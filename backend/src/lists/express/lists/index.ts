import { IRouter } from "express";
import {
  makePaginationOptions,
  makePaginationResponse,
} from "../../../pagination";
import { castUserId, User } from "../../../users/models";
import { removeNullOrUndefinedEntries } from "../../../utils";
import {
  castListDescription,
  castListId,
  castListTitle,
  ListId,
} from "../../models";
import { Dependencies } from "../types";
import { isNullOrUndefined } from "util";

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

        const [editedList] = await listLogic.editLists([
          {
            id: listId,
            ...edits,
          },
        ]);

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

      const [list] = await listLogic.addLists([
        {
          ownerId: ownerId,
          title,
          description,
        },
      ]);

      res.status(201).json(list);
    } catch (error) {
      res.status(400).json({ error, message: "failed to post list" }).end();
    }
  });

  router.delete("/lists/:listId", async (req, res, next) => {
    try {
      const listId = castListId(req.params.listId);

      await listLogic.removeLists([{ id: listId }]);

      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error, message: "failed to delete list" }).end();
    }
  });
};
