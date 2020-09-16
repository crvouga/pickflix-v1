import {Router} from 'express';
import {authenticated} from '../../../middlewares/authenticated';

const ensureArray = (x: any) => (Array.isArray(x) ? x : [x]);

export default (router: Router) =>
  router.get('/lists', authenticated, async (req, res) => {
    const {currentUser, ListLogic, TMDbLogic} = req;
    const tmdbMediaIds = req.query.tmdbMediaIds;

    const listInfo = {
      tmdbMediaIds: ensureArray(tmdbMediaIds),
      userId: currentUser.id,
    };

    const lists = await ListLogic.getListsByUser(listInfo);

    const response = [];

    for (const list of lists) {
      const listItemCount = await ListLogic.countListItems({listId: list.id});
      const listItems = await ListLogic.getListItems({listId: list.id});
      const listItemsWithTMDbData = [];
      for (const listItem of listItems) {
        const {tmdbMediaId, tmdbMediaType} = listItem;
        const tmdbData = await TMDbLogic.request({
          path: `/${tmdbMediaType}/${tmdbMediaId}`,
        });
        listItemsWithTMDbData.push({
          ...listItem,
          tmdbData,
        });
      }
      response.push({
        ...list,
        listItemCount,
        listItems: listItemsWithTMDbData,
      });
    }

    res.json(response).end();
  });
