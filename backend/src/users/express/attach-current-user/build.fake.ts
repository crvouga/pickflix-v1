import express from 'express';
import {makeUserFake} from '../../models/make-user.fake';

export const buildAttachCurrentUserFake = () => {
  const currentUser = makeUserFake();
  const attachCurrentUser: express.Handler = (req, res, next) => {
    req.currentUser = currentUser;
    next();
  };
  return {
    currentUser,
    attachCurrentUser,
  };
};
