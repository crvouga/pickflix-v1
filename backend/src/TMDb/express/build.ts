import express from 'express';
import {TmdbLogic} from '../logic/build';

export const buildTmdbRouter = ({tmdbLogic}: {tmdbLogic: TmdbLogic}) => {
  const router = express.Router();

  const allRouter = express.Router();

  allRouter.all('*', async (req, res) => {
    const path = req.path as string;
    const query = req.query as {[key: string]: string};
    const tmdbData = await tmdbLogic.request({path, query});
    res.json(tmdbData);
  });

  router.use('/tmdb', allRouter);

  return router;
};
