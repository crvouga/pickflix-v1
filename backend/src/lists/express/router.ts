import express, {ErrorRequestHandler} from 'express';
import {BuildListRouter} from './types';

export const buildListRouter: BuildListRouter = ({
  attachCurrentUser,
  ListHandlers,
}) => {
  const router = express.Router();

  router
    .use(attachCurrentUser)
    .get('/', ListHandlers.getLists)
    .post('/', ListHandlers.postList)
    .get('/:listId', ListHandlers.getList)
    .delete('/:listId', ListHandlers.deleteList)
    .post('/:listId/items', ListHandlers.postListItem)
    .delete('/:listId/items/:listItemId', ListHandlers.deleteListItem);

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    } else {
      return next();
    }
  };

  router.use(errorHandler);

  return router;
};
