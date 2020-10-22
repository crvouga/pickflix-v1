import {IRouter} from 'express';
import {ListId} from '../../models/types';
import {Dependencies} from '../types';

export const removeList = ({listLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.delete(
    '/lists/:listId',
    middlewares.authenticate,
    async (req, res, next) => {
      try {
        const listId = req.params.listId as ListId;

        await listLogic.removeLists([{id: listId}]);

        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
