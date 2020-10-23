import {Handler} from 'express';
import passport from 'passport';

export const attachUser: Handler = (req, res, next) => {
  passport.authenticate('local')(req, res, next);
};

export const authenticate: Handler = (req, res, next) => {
  passport.authenticate('local')(req, res, () => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).end();
    }
  });
};
