import express from 'express';
import {Dependencies} from './types';
import {buildListRouter} from '../lists/express/build';
import {buildTmdbRouter} from '../tmdb/express/build';
import {buildYoutubeRouter} from '../youtube/express/build';

const routerBuilders = [buildListRouter, buildTmdbRouter, buildYoutubeRouter];

export const buildRouter = (dependencies: Dependencies) => {
  const router = express.Router();
  for (const buildRouter of routerBuilders) {
    router.use(buildRouter(dependencies));
  }
  return router;
};
