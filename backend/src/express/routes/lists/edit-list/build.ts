import R from 'ramda';
import {Id} from '../../../../id/types';
import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({listLogic, middlewares}) => router => {
  router.use(middlewares.attachCurrentUser);

  router.patch('/lists/:listId', async (req, res) => {
    const listId = req.params.listId as Id;

    const edits = R.pick(['title', 'description'], req.body);

    const [patched] = await listLogic.editLists([{id: listId, ...edits}]);

    res.json(patched).end();
  });

  return router;
};
