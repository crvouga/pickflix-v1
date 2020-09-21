import {Id} from '../../../../id/types';
import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({ListLogic, middlewares}) => router => {
  router.use(middlewares.attachCurrentUser);
  router.delete('/lists/:listId', async (req, res) => {
    const listId = req.params.listId as Id;

    await ListLogic.removeLists({listIds: [listId]});

    res.status(204).end();
  });

  return router;
};
