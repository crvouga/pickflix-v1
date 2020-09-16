import {Router} from 'express';
import {Id} from '../../../../id/types';
import {authenticated} from '../../../middlewares/authenticated';

export default (router: Router) =>
  router.delete(
    '/lists/:listId/list-items',
    authenticated,

    async (req, res) => {
      const {ListLogic} = req;
      const listItemIds = req.body as Id[];
      const listId = req.params.listId as Id;
      await ListLogic.removeListItems(
        listItemIds.map(listItemId => ({listId: listId, id: listItemId}))
      );
      res.status(204).end();
    }
  );
