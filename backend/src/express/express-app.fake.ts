import {Handler} from 'express';
import {buildListLogicFake} from '../lists/logic/build.fake';
import {buildTMDbLogicFake} from '../TMDb/logic/build.fake';
import {buildFirebaseAdminFake} from '../users/firebase-admin.fake';
import {buildUserLogicFake} from '../users/logic/user-logic.fake';
import {makeUserFake} from '../users/models/make-user.fake';
import {buildExpressApp} from './express-app';

export const buildExpressAppFake = async () => {
  const currentUser = makeUserFake();

  const {UserLogic} = buildUserLogicFake();
  const {ListLogic} = buildListLogicFake();
  const {TMDbLogic} = buildTMDbLogicFake();

  const {firebaseAdmin} = buildFirebaseAdminFake({
    firebaseId: currentUser.firebaseId,
  });

  const attachCurrentUser: Handler = (req, res, next) => {
    req.currentUser = currentUser;
    next();
  };

  const {app} = buildExpressApp({
    UserLogic,
    ListLogic,
    TMDbLogic,
    firebaseAdmin,
    attachCurrentUser,
  });

  return {
    TMDbLogic,
    ListLogic,
    UserLogic,
    currentUser,
    app,
  };
};
