import {Router} from 'express';
import {Id} from '../../../../id/types';
import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({ListLogic}) => (router: Router) => {
  router.get('/lists/:listId', async (req, res) => {
    const listId = req.params.listId as Id;

    const [list] = await ListLogic.getLists({listId});

    if (!list) {
      return res.status(404).end();
    }

    const response = {
      ...list,
      listItemCount: 0,
    };

    res.json(response);
  });
  return router;
};
