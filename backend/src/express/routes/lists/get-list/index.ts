import {Router} from 'express';
import {Id} from '../../../../id/types';

export default (router: Router) =>
  router.get('/lists/:listId', async (req, res) => {
    const {ListLogic} = req;
    const listId = req.params.listId as Id;

    const list = await ListLogic.getList({listId});

    if (!list) {
      return res.status(404).end();
    }

    res.json(list);
  });
