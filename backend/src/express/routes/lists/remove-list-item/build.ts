import {Id} from '../../../../id/types';
import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({listLogic, middlewares}) => router => {
  router.use(middlewares.attachCurrentUser);

  router.delete('/lists/:listId/list-items', async (req, res) => {
    const listItemIds = req.body as Id[];
    const listId = req.params.listId as Id;
    await listLogic.removeListItems(
      listItemIds.map(listItemId => ({listId: listId, id: listItemId}))
    );
    res.status(204).end();
  });
  return router;
};
