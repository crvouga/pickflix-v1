import express from 'express';
import {buildListLogicFake} from '../lists/logic/build.fake';
import {buildMediaLogicFake} from '../media/logic/build.fake';
import {buildReviewLogicFake} from '../reviews/logic/build.fake';
import {buildAuthenticateFake} from '../users/express/authenticate/build.fake';
import {buildUserLogicFake} from '../users/logic/user-logic.fake';
import {buildExpressApp} from './build';

export const buildExpressAppFake = async () => {
  const {userLogic} = buildUserLogicFake();
  const {listLogic} = buildListLogicFake();
  const {mediaLogic} = buildMediaLogicFake();
  const {reviewLogic} = buildReviewLogicFake();
  const {
    authenticate,
    attachCurrentUser,
    currentUser,
  } = buildAuthenticateFake();

  const dependenciesFake = {
    currentUser,
    listLogic,
    userLogic,
    mediaLogic,
    reviewLogic,
    middlewares: {
      attachCurrentUser,
      authenticate,
    },
  };

  const app = express();

  buildExpressApp(dependenciesFake)(app);

  return {
    ...dependenciesFake,
    app,
  };
};
