import express, {IRouter} from 'express';
import {TmdbLogic} from '../logic/build';

export const buildTmdbRouter = ({tmdbLogic}: {tmdbLogic: TmdbLogic}) => (
  router: IRouter
) => {
  router.use(
    '/tmdb',
    express.Router().all('*', async (req, res) => {
      const path = req.path as string;
      const query = req.query as {[key: string]: string};
      const tmdbData = await tmdbLogic.request({path, query});
      res.json(tmdbData);
    })
  );
};
