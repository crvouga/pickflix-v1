import {Handler} from 'express';
import {makeUserFake} from '../../models/make-user.fake';

export const buildAuthenticateFake = () => {
  const currentUser = makeUserFake();
  const authenticate: Handler = (req, res, next) => {
    req.currentUser = currentUser;
    next();
  };
  const attachCurrentUser: Handler = (req, res, next) => {
    req.currentUser = currentUser;
    next();
  };
  return {
    attachCurrentUser,
    currentUser,
    authenticate,
  };
};
