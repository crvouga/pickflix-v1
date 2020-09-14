import {Router} from 'express';
import R from 'ramda';
import {Id} from '../../../../id/types';
import {authenticated} from '../../../middlewares/authenticated';

export default (router: Router) =>
  router.patch('/lists/:listId', authenticated, async (req, res) => {
    const {ListLogic} = req;

    const listId = req.params.listId as Id;

    const edits = R.pick(['title', 'description'], req.body);

    const patched = await ListLogic.editList({listId, ...edits});

    res.json(patched).end();
  });
