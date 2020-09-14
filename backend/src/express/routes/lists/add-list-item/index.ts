import {Router} from 'express';
import {Id} from '../../../../id/types';
import {authenticated} from '../../../middlewares/authenticated';

export default (router: Router) =>
  router.post('/lists/:listId/list-items', authenticated, async (req, res) => {
    const {ListLogic} = req;
    const {tmdbMediaId, tmdbMediaType} = req.body;
    const listId = req.params.listId as Id;

    await ListLogic.addListItems([
      {
        listId,
        tmdbMediaId,
        tmdbMediaType,
      },
    ]);

    res.status(201).json({message: 'Successfully added item to list.'}).end();
  });
