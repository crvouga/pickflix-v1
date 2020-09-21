import {Router} from 'express';
import {BuildRoute} from '../../types';

export const build: BuildRoute = ({TMDbLogic}) => (router: Router) => {
  const tmdbRouter = Router();

  tmdbRouter.all('*', async (req, res) => {
    const {path, query} = req;
    const tmdbData = await TMDbLogic.request({path, query});
    res.json(tmdbData);
  });

  router.use('/tmdb', tmdbRouter);
  return router;
};
