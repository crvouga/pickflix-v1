import {Router} from 'express';
import {Id} from '../../../../id/types';
import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({listLogic}) => (router: Router) => {
  router.get('/lists/:listId', async (req, res) => {
    const listId = req.params.listId as Id;

    const lists = await listLogic.getLists({listId});

    if (lists.length === 0) {
      return res.status(404).end();
    }
    const [list] = lists;
    res.json(list);
  });
  return router;
};
