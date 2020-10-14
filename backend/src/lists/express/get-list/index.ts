import {IRouter} from 'express';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';

export const getList = ({listLogic}: Dependencies) => (router: IRouter) => {
  router.get('/lists/:listId', async (req, res, next) => {
    try {
      const listId = req.params.listId as Id;

      const lists = await listLogic.getLists({id: listId});

      if (lists.length > 0) {
        const [list] = lists;

        return res.json(list);
      }

      const autoLists = await listLogic.getAutoLists({id: listId});

      if (autoLists.length > 0) {
        const [autoList] = autoLists;

        return res.json(autoList);
      }

      res.status(404).end();
    } catch (error) {
      next(error);
    }
  });
};
