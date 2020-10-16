import {IRouter} from 'express';
import {Dependencies} from '../../../express/types';
import {Id} from '../../../id/types';
import {User} from '../../../users/models/types';
import {ListId} from '../../models/types';

export const addListItem = ({listLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.post(
    '/lists/:listId/list-items',
    middlewares.attachCurrentUser,
    async (req, res, next) => {
      try {
        const currentUser = req.currentUser as User;
        const {tmdbMediaId, tmdbMediaType} = req.body;
        const listId = req.params.listId as ListId;

        const [listItem] = await listLogic.addListItems([
          {
            userId: currentUser.id,
            listId,
            tmdbMediaId,
            tmdbMediaType,
          },
        ]);

        res.status(201).json(listItem);
      } catch (err) {
        res.status(400).json({message: 'failed to add item to list'});
      }
    }
  );
};
