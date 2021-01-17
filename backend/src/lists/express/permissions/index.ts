import { IRouter } from "express";
import { castArray } from "../../../common/utils";
import { castUserId } from "../../../users/models";
import { castListId } from "../../models";
import { Dependencies } from "../types";

export const permissions = ({ listLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.post(
    "/lists/:listId/editors",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        const listId = castListId(req.params.listId);
        const userId = castUserId(req.user?.id);
        const editorIds = castArray(req.body).map(castUserId);

        await listLogic.addEditors({
          listId,
          userId,
          editorIds,
        });

        res.status(201).end();
      } catch (error) {
        res.status(400).json({ error: error.toString() }).end();
      }
    }
  );
  router.delete(
    "/lists/:listId/editors",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        const listId = castListId(req.params.listId);
        const userId = castUserId(req.user?.id);
        const editorIds = castArray(req.body).map(castUserId);

        await listLogic.removeEditors({
          listId,
          userId,
          editorIds,
        });

        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: error.toString() }).end();
      }
    }
  );
  router.post(
    "/lists/:listId/transfer",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        const listId = castListId(req.params.listId);
        const ownerId = castUserId(req.user?.id);
        const editorId = castUserId(req.body.editorId);

        await listLogic.transferOwnership({
          ownerId,
          editorId,
          listId,
        });

        res.status(201).end();
      } catch (error) {
        res.status(400).json({ error: error.toString() }).end();
      }
    }
  );
};
