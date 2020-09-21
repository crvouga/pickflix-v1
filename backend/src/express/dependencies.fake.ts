import {Handler} from 'express';
import {buildListLogicFake} from '../lists/logic/build.fake';
import {buildTMDbLogicFake} from '../TMDb/logic/build.fake';
import {buildUserLogicFake} from '../users/logic/user-logic.fake';
import {makeUserFake} from '../users/models/make-user.fake';

const currentUser = makeUserFake();
const {UserLogic} = buildUserLogicFake();
const {ListLogic} = buildListLogicFake();
const {TMDbLogic} = buildTMDbLogicFake();

const attachCurrentUser: Handler = (req, res, next) => {
  req.currentUser = currentUser;
  next();
};

export const dependenciesFake = {
  currentUser,
  ListLogic,
  UserLogic,
  TMDbLogic,
  middlewares: {
    attachCurrentUser,
  },
};
