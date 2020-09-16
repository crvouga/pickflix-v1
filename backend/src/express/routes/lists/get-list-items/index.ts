import {Router} from 'express';

export default (router: Router) =>
  router.get('/lists/:listId/list-items', async (req, res) => {
    const {ListLogic, TMDbLogic} = req;
    const listId = req.params.listId;

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
