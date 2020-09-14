import {Router} from 'express';
import {authenticated} from '../../../middlewares/authenticated';

const ensureArray = (x: any) => (Array.isArray(x) ? x : [x]);

export default (router: Router) =>
  router.get('/lists', authenticated, async (req, res) => {
    const {currentUser, ListLogic} = req;
    const tmdbIds = req.query.tmdbIds;

    const listInfo = {
      tmdbIds: ensureArray(tmdbIds),
      userId: currentUser.id,
    };

    const lists = await ListLogic.getListsByUser(listInfo);

    res.json(lists).end();
  });
