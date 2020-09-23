import express from 'express';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';

export const getListItems = ({listLogic}: Dependencies) => {
  const router = express.Router();
  router.get('/lists/:listId/list-items', async (req, res) => {
    const listId = req.params.listId as Id;
    const listItems = await listLogic.getListItems({listId});
    res.json(listItems);
  });
  return router;
};
