import {IRouter} from 'express';
import {TmdbMediaType} from '../../../media/models/types';
import {User} from '../../../users/models/types';
import {Dependencies} from '../types';

export const getListsFromListItem = ({
  listLogic,
  middlewares,
}: Dependencies) => (router: IRouter) => {
  router.get(
    '/list-items/lists',
    middlewares.attachCurrentUser,
    async (req, res, next) => {
      try {
        const currentUser = req.currentUser as User;
        const listItemInfo = req.query as {
          tmdbMediaId: string;
          tmdbMediaType: TmdbMediaType;
        };

        const lists = await listLogic.getListsFromListItem({
          ...listItemInfo,
          userId: currentUser.id,
        });

        res.status(200).json(lists).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
