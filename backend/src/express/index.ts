import express from 'express';
import {buildExpressApp} from './build';
import {listLogic} from '../lists/logic';
import {mediaLogic} from '../media/logic';
import {userLogic} from '../users/logic';
import {attachCurrentUser} from '../users/express/attach-current-user';
import {Dependencies} from './types';

export const dependencies: Dependencies = {
  listLogic,
  userLogic,
  mediaLogic,
  middlewares: {
    attachCurrentUser,
  },
};

export const app = express();
buildExpressApp(dependencies)(app);
