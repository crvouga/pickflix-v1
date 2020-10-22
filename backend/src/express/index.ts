import express from 'express';
import {listLogic} from '../lists/logic';
import {mediaLogic} from '../media/logic';
import {reviewLogic} from '../reviews/logic';
import {authenticate, attachCurrentUser} from '../users/express/authenticate';
import {userLogic} from '../users/logic';
import {buildExpressApp} from './build';
import {Dependencies} from './types';

export const dependencies: Dependencies = {
  listLogic,
  userLogic,
  mediaLogic,
  reviewLogic,
  middlewares: {
    attachCurrentUser,
    authenticate,
  },
};

export const app = express();

buildExpressApp(dependencies)(app);
