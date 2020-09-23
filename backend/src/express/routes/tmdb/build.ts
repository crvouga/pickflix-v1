import {Router} from 'express';
import {BuildRoute} from '../../types';

export const build: BuildRoute = ({tmdbLogic}) => (router: Router) => {
  const tmdbRouter = Router();

  tmdbRouter.all('*', async (req, res) => {
    const path = req.path as string;
    const query = req.query as {[key: string]: string};
    const tmdbData = await tmdbLogic.request({path, query});
    res.json(tmdbData);
  });

  router.use('/tmdb', tmdbRouter);
  return router;
};
