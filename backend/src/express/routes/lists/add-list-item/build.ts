import {Id} from '../../../../id/types';
import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({ListLogic, middlewares}) => router => {
  router.use(middlewares.attachCurrentUser);

  router.post('/lists/:listId/list-items', async (req, res) => {
    const {tmdbMediaId, tmdbMediaType} = req.body;
    const listId = req.params.listId as Id;

    const [listItem] = await ListLogic.addListItems([
      {
        listId,
        tmdbMediaId,
        tmdbMediaType,
      },
    ]);

    res.status(201).json(listItem);
  });

  return router;
};
