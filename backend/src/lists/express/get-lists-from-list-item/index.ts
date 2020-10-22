import {IRouter} from 'express';
import {TmdbMediaType, TmdbMediaId} from '../../../media/models/types';
import {User} from '../../../users/models/types';
import {Dependencies} from '../types';

export const getListsFromListItem = ({
  listLogic,
  middlewares,
}: Dependencies) => (router: IRouter) => {
  router.get(
    '/list-items/lists',
    middlewares.authenticate,
    async (req, res, next) => {
      try {
        const currentUser = req.currentUser as User;
        const userId = currentUser.id;
        const tmdbMediaId = Number(req.query.tmdbMediaId) as TmdbMediaId;
        const tmdbMediaType = req.query.tmdbMediaType as TmdbMediaType;

        const lists = await listLogic.getListsFromListItem({
          userId,
          tmdbMediaId,
          tmdbMediaType,
        });

        res.status(200).json(lists).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
