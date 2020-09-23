import express from 'express';
import {Dependencies} from './types';
import {buildListRouter} from '../lists/express/build';
import {buildTmdbRouter} from '../tmdb/express/build';
import {buildYoutubeRouter} from '../youtube/express/build';

const buildRouterList = [buildListRouter, buildTmdbRouter, buildYoutubeRouter];

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    res
      .status(500)
      .json({
        message: JSON.stringify(err),
      })
      .end();
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
