import {buildListRouter} from './router';
import {IRouter} from 'express';
import {buildListHandlers} from './handlers';
import {ListLogic} from '../logic';
import {attachCurrentUser} from '../../users/express/attachCurrentUser';

export const useListRouter = (app: IRouter) => {
  const ListHandlers = buildListHandlers({ListLogic});
  const ListRouter = buildListRouter({ListHandlers, attachCurrentUser});
  app.use('/lists', ListRouter);
  return app;
};
