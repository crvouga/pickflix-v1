import express from 'express';
import {buildListsRouter} from '../lists/express/build';
import {buildMediaRouter} from '../media/express/build';
import {buildReviewsRouter} from '../reviews/express/build';
import {Dependencies} from './types';

const buildRouterList = [
  buildListsRouter,
  buildMediaRouter,
  buildReviewsRouter,
];

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
