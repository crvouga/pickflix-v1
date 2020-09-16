import {Application, Handler} from 'express';
import {ListLogic} from '../lists/logic/types';
import {UserLogic} from '../users/logic/types';
import {TMDbLogic} from '../TMDb/logic/types';

type Dependencies = {
  UserLogic: UserLogic;
  ListLogic: ListLogic;
  TMDbLogic: TMDbLogic;
  attachCurrentUser: Handler;
  firebaseAdmin: any;
};

export type BuildExpressApp = (_: Dependencies) => {app: Application};
