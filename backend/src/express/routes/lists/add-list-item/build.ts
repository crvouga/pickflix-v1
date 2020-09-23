import {Id} from '../../../../id/types';
import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({listLogic, middlewares}) => router => {
  router.use(middlewares.attachCurrentUser);

  router.post('/lists/:listId/list-items', async (req, res) => {
    const {tmdbMediaId, tmdbMediaType} = req.body;
    const listId = req.params.listId as Id;

    try {
      const [listItem] = await listLogic.addListItems([
        {
          listId,
          tmdbMediaId,
          tmdbMediaType,
        },
      ]);

      res.status(201).json(listItem);
    } catch (err) {
      res.status(400).json({message: 'Failed to add item to list'});
    }
  });

  return router;
};
