import express from 'express';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';

export const removeListItem = ({listLogic, middlewares}: Dependencies) => {
  const router = express.Router();

  router.use(middlewares.attachCurrentUser);

  router.delete('/lists/:listId/list-items', async (req, res) => {
    const listItemIds = req.body as Id[];

    const listId = req.params.listId as Id;

    await listLogic.removeListItems(
      listItemIds.map(listItemId => ({listId: listId, id: listItemId}))
    );

    res.status(204).end();
  });

  return router;
};
