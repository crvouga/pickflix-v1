import {IRouter} from 'express';
import {ExpressAppDependencies} from '../../../express/types';
import {User} from '../../../users/models/make-user';
import {ListId} from '../../models/types';

export const addListItem = ({
  listLogic,
  middlewares,
}: ExpressAppDependencies) => (router: IRouter) => {
  router.post(
    '/lists/:listId/list-items',
    middlewares.protected,
    async (req, res, next) => {
      try {
        const user = req.user as User;
        const {tmdbMediaId, tmdbMediaType} = req.body;
        const listId = req.params.listId as ListId;

        const [listItem] = await listLogic.addListItems([
          {
            userId: user.id,
            listId,
            tmdbMediaId,
            tmdbMediaType,
          },
        ]);

        res.status(201).json(listItem).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
