import {Router} from 'express';
import {Id} from '../../../../id/types';
import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({ListLogic, TMDbLogic}) => (
  router: Router
) => {
  router.get('/lists/:listId/list-items', async (req, res) => {
    const listId = req.params.listId as Id;
    const listItems = await ListLogic.getListItems({listId});
    res.json(listItems);
  });
  return router;
};
