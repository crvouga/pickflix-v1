import express from 'express';
import {buildExpressApp} from './build';
import {listLogic} from '../lists/logic';
import {tmdbLogic} from '../tmdb/logic';
import {userLogic} from '../users/logic';
import {attachCurrentUser} from '../users/express/attach-current-user';
import {Dependencies} from './types';

export const dependencies: Dependencies = {
  listLogic,
  userLogic,
  tmdbLogic,
  middlewares: {
    attachCurrentUser,
  },
};

export const app = express();
buildExpressApp(dependencies)(app);
