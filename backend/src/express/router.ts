import express from 'express';
import {useTmdbRouter} from './tmdb';
import {useYoutubeRouter} from './youtube';
import {useListRouter} from '../lists/express';

export default () => {
  const router = express.Router();
  useTmdbRouter(router);
  useYoutubeRouter(router);
  useListRouter(router);
  return router;
};
