import {Handler} from 'express';

export const authenticated: Handler = async (req, res, next) => {
  if (req.currentUser) {
    next();
  } else {
    res.status(401).end();
  }
};
