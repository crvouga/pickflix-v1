import {Handler} from 'express';
import {buildListLogicFake} from '../lists/logic/build.fake';
import {buildTmdbLogicFake} from '../tmdb/logic/build.fake';
import {buildUserLogicFake} from '../users/logic/user-logic.fake';
import {makeUserFake} from '../users/models/make-user.fake';

const currentUser = makeUserFake();
const {userLogic} = buildUserLogicFake();
const {listLogic} = buildListLogicFake();
const {tmdbLogic} = buildTmdbLogicFake();

const attachCurrentUser: Handler = (req, res, next) => {
  req.currentUser = currentUser;
  next();
};

export const dependenciesFake = {
  currentUser,
  listLogic,
  userLogic,
  tmdbLogic,
  middlewares: {
    attachCurrentUser,
  },
};
