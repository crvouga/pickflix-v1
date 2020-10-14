import {IRouter} from 'express';
import {User} from '../../../users/models/types';
import {AutoListTitleEnum} from '../../models/types';
import {Dependencies} from '../types';

export const autoLists = ({listLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.get(
    '/auto-lists/watch-next',
    middlewares.attachCurrentUser,
    async (req, res, next) => {
      try {
        const currentUser = req.currentUser as User;

        const autoLists = await listLogic.getAutoLists({
          title: AutoListTitleEnum.WatchNext,
          ownerId: currentUser.id,
        });

        if (autoLists.length > 0) {
          const [list] = autoLists;

          return res.json(list);
        }

        res.status(404).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/auto-lists/watch-next/list-items',
    middlewares.attachCurrentUser,
    async (req, res, next) => {
      try {
        const {tmdbMediaId, tmdbMediaType} = req.body;
        const currentUser = req.currentUser as User;

        const autoLists = await listLogic.getAutoLists({
          title: AutoListTitleEnum.WatchNext,
          ownerId: currentUser.id,
        });

        if (autoLists.length > 0) {
          const [list] = autoLists;

          const [listItem] = await listLogic.addListItems([
            {
              listId: list.id,
              tmdbMediaId,
              tmdbMediaType,
            },
          ]);

          return res.status(201).json(listItem);
        }
        res.status(404).end();
      } catch (err) {
        res.status(400).json({message: 'failed to add item to list'});
      }
    }
  );
};
