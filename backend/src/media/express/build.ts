import express from 'express';
import {like} from './like';
import {tmdb} from './tmdb';
import {Dependencies} from './types';
import {youtube} from './youtube';

const buildRouterList = [tmdb, youtube, like];

export const buildMediaRouter = (dependencies: Dependencies) => (
  router: express.IRouter
) => {
  for (const buildRouter of buildRouterList) {
    buildRouter(dependencies)(router);
  }
};