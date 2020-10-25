import {IRouter} from 'express';
import passport from 'passport';
import {TmdbMediaId, TmdbMediaType} from '../../../media/models/types';
import {User} from '../../../users/models/make-user';
import {Dependencies} from '../types';

export const getListsFromListItem = ({
  listLogic,
  middlewares,
}: Dependencies) => (router: IRouter) => {
  router.get(
    '/list-items/lists',
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
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
