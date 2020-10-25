import express from 'express';
import {listLogic} from '../lists/logic';
import {mediaLogic} from '../media/logic';
import {reviewLogic} from '../reviews/logic';
import {
  authenticate,
  isAuthenticated,
} from '../users/express/build-auth-middleware';
import {userLogic} from '../users/logic';
import {buildExpressApp} from './build';
import {ExpressAppDependencies} from './types';

export const dependencies: ExpressAppDependencies = {
  listLogic,
  userLogic,
  mediaLogic,
  reviewLogic,
  middlewares: {
    authenticate,
    isAuthenticated,
  },
};

export const app = express();

buildExpressApp(dependencies)(app);
