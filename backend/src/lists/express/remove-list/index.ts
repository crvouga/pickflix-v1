import express from 'express';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';

export const removeList = ({listLogic, middlewares}: Dependencies) => {
  const router = express.Router();

  router.use(middlewares.attachCurrentUser);

  router.delete('/lists/:listId', async (req, res) => {
    const listId = req.params.listId as Id;

    await listLogic.removeLists({listIds: [listId]});

    res.status(204).end();
  });

  return router;
};
