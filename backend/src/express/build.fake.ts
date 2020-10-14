import express from 'express';
import {buildListLogicFake} from '../lists/logic/build.fake';
import {buildMediaLogicFake} from '../media/logic/build.fake';
import {buildAttachCurrentUserFake} from '../users/express/attach-current-user/build.fake';
import {buildUserLogicFake} from '../users/logic/user-logic.fake';
import {buildExpressApp} from './build';

export const buildExpressAppFake = async () => {
  const {userLogic} = buildUserLogicFake();
  const {listLogic} = buildListLogicFake();
  const {mediaLogic} = buildMediaLogicFake();
  const {attachCurrentUser, currentUser} = buildAttachCurrentUserFake();

  const dependenciesFake = {
    currentUser,
    listLogic,
    userLogic,
    mediaLogic,
    middlewares: {
      attachCurrentUser,
    },
  };

  const app = express();

  buildExpressApp(dependenciesFake)(app);

  return {
    ...dependenciesFake,
    app,
  };
};
