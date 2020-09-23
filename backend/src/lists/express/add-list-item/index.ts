import {IRouter} from 'express';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';

export const addListItem = ({listLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.post(
    '/lists/:listId/list-items',
    middlewares.attachCurrentUser,
    async (req, res) => {
      const {tmdbMediaId, tmdbMediaType} = req.body;
      const listId = req.params.listId as Id;

      try {
        const [listItem] = await listLogic.addListItems([
          {
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
