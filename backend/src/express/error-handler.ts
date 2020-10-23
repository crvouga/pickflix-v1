import {ErrorRequestHandler} from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    res.status(400).json(err).end();
  } else {
    next();
  }
};
