import {Router} from 'express';
import {Id} from '../../../../id/types';
import {authenticated} from '../../../middlewares/authenticated';

export default (router: Router) =>
  router.delete('/lists/:listId', authenticated, async (req, res) => {
    const {ListLogic, currentUser} = req;
    const listId = req.params.listId as Id;

    await ListLogic.deleteList({userId: currentUser.id, listId});

    res.status(204).end();
  });
