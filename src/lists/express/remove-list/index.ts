import {IRouter} from 'express';
import {ListId} from '../../models/types';
import {Dependencies} from '../types';

export const removeList = ({listLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.delete(
    '/lists/:listId',
    (req, res, next) => {
      console.log('HELLO');
      next();
    },
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const listId = req.params.listId as ListId;

        await listLogic.removeLists([{id: listId}]);

        res.status(204).end();
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );
};
