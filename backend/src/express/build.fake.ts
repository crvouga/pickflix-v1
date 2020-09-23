import express from 'express';
import {buildListLogicFake} from '../lists/logic/build.fake';
import {buildTmdbLogicFake} from '../tmdb/logic/build.fake';
import {buildAttachCurrentUserFake} from '../users/express/attach-current-user/build.fake';
import {buildUserLogicFake} from '../users/logic/user-logic.fake';
import {buildExpressApp} from './build';

const {userLogic} = buildUserLogicFake();
const {listLogic} = buildListLogicFake();
const {tmdbLogic} = buildTmdbLogicFake();
const {attachCurrentUser, currentUser} = buildAttachCurrentUserFake();

export const dependenciesFake = {
  currentUser,
  listLogic,
  userLogic,
  tmdbLogic,
  middlewares: {
    attachCurrentUser,
  },
};

export const buildExpressAppFake = () => {
  const app = express();
  buildExpressApp(dependenciesFake)(app);
  return {
    ...dependenciesFake,
    app,
  };
};
