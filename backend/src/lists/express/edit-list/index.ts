import express from 'express';
import R from 'ramda';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';

export const editList = ({listLogic, middlewares}: Dependencies) => {
  const router = express.Router();

  router.use(middlewares.attachCurrentUser);

  router.patch('/lists/:listId', async (req, res) => {
    const listId = req.params.listId as Id;

    const edits = R.pick(['title', 'description'], req.body);

    const [editedList] = await listLogic.editLists([{id: listId, ...edits}]);

    res.json(editedList).end();
  });

  return router;
};
