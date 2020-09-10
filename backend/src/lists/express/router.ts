import express from 'express';
import {BuildListRouter} from './types';

export const buildListRouter: BuildListRouter = ({
  attachCurrentUser,
  ListHandlers,
}) => {
  const router = express.Router();

  router
    .use(attachCurrentUser)
    .get('/lists', ListHandlers.getLists)
    .post('/lists', ListHandlers.postList)
    .get('/lists/:listId', ListHandlers.getList)
    .delete('/lists/:listId', ListHandlers.deleteList)
    .post('/lists/:listId/items', ListHandlers.postListItem)
    .delete('/lists/:listId/items/:listItemId', ListHandlers.deleteListItem);

  return router;
};
