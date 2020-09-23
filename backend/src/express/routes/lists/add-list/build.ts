import {BuildRoute} from '../../../types';

export const build: BuildRoute = ({listLogic, middlewares}) => router => {
  router.use(middlewares.attachCurrentUser);

  router.post('/lists', async (req, res) => {
    const currentUser = req.currentUser;
    const {title, description} = req.body;
    const [list] = await listLogic.addLists([
      {
        ownerId: currentUser.id,
        title,
        description,
      },
    ]);
    res.status(201).json(list);
  });

  return router;
};
