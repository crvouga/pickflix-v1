import {Application, Handler} from 'express';
import {ListLogic} from '../lists/logic/types';
import {UserLogic} from '../users/logic/types';

type Dependencies = {
  UserLogic: UserLogic;
  ListLogic: ListLogic;
  attachCurrentUser: Handler;
  firebaseAdmin: any;
};

export type BuildExpressApp = (_: Dependencies) => {app: Application};
