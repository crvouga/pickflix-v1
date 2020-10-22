import {IRouter} from 'express';
import R from 'ramda';
import {ListId} from '../../../lists/models/types';
import {Dependencies} from '../types';

export const editList = ({listLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.patch(
    '/lists/:listId',
    middlewares.authenticate,
    async (req, res, next) => {
      try {
        const listId = req.params.listId as ListId;

        const edits = R.pick(['title', 'description'], req.body);

        const [editedList] = await listLogic.editLists([
          {id: listId, ...edits},
        ]);

        res.json(editedList).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
