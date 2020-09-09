import express from 'express';
import tmdb from './tmdb';
import youtube from './youtube';

export default () => {
  const router = express.Router();
  tmdb(router);
  youtube(router);
  return router;
};
