import {Application, Handler, IRouter} from 'express';
import {ListLogic} from '../lists/logic/types';
import {TMDbLogic} from '../TMDb/logic/types';
import {UserLogic} from '../users/logic/types';
import {User} from '../users/models/types';

export type Dependencies = {
  ListLogic: ListLogic;
  TMDbLogic: TMDbLogic;
  UserLogic: UserLogic;
  middlewares: {
    attachCurrentUser: Handler;
  };
};

export type BuildRouter = (_: Dependencies) => IRouter;
export type BuildExpressApp = (_: Dependencies) => {app: Application};

export type BuildRoute = (_: Dependencies) => (_: IRouter) => IRouter;
