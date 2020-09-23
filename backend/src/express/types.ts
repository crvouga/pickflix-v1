import {Application, Handler, IRouter} from 'express';
import {ListLogic} from '../lists/logic/build';
import {TmdbLogic} from '../tmdb/logic/build';
import {UserLogic} from '../users/logic/user-logic';

export type Dependencies = {
  listLogic: ListLogic;
  tmdbLogic: TmdbLogic;
  userLogic: UserLogic;
  middlewares: {
    attachCurrentUser: Handler;
  };
};

export type BuildRouter = (_: Dependencies) => IRouter;
export type BuildExpressApp = (_: Dependencies) => {app: Application};

export type BuildRoute = (_: Dependencies) => (_: IRouter) => IRouter;
