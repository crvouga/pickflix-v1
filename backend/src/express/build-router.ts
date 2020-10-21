import express from 'express';
import {Dependencies} from './types';
import {buildListRouter} from '../lists/express/build';
import {buildMediaRouter} from '../media/express/build';

const buildRouterList = [buildListRouter, buildMediaRouter];

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    res.status(400).json(err).end();
  } else {
    next();
  }
};

export const buildRouter = (dependencies: Dependencies) => (
  app: express.IRouter
) => {
  const router = express.Router();

  for (const buildRouter of buildRouterList) {
    buildRouter(dependencies)(router);
  }

  app.use('/api', router);
  app.use(errorHandler);

  return {app, router};
};
