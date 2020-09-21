import {Router} from 'express';
import {Id} from '../../../../id/types';
import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({ListLogic, TMDbLogic}) => (
  router: Router
) => {
  router.get('/lists/:listId/list-items', async (req, res) => {
    const listId = req.params.listId as Id;

    const listItems = await ListLogic.getListItems({listId});

    const response = [];

    for (const listItem of listItems) {
      const {tmdbMediaId, tmdbMediaType} = listItem;

      const tmdbData = await TMDbLogic.request({
        path: `/${tmdbMediaType}/${tmdbMediaId}`,
      });

      response.push({
        ...listItem,
        tmdbData,
      });
    }

    res.status(200).json(response).end();
  });
  return router;
};
