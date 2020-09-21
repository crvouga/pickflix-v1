import {Router} from 'express';
import {BuildRoute} from '../../../types';

const ensureArray = (x: any) => (Array.isArray(x) ? x : [x]);

export const build: BuildRoute = ({ListLogic, middlewares}) => (
  router: Router
) => {
  router.use(middlewares.attachCurrentUser);

  router.get('/lists', async (req, res) => {
    const {currentUser} = req;
    const listInfo = {
      ownerId: currentUser.id,
    };
    const lists = await ListLogic.getLists(listInfo);
    res.json(lists).end();
  });
  return router;
};
