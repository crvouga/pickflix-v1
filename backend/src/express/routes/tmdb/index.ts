import {Router} from 'express';

export default (router: Router) => {
  router.use(
    '/tmdb',
    Router({mergeParams: true}).all('*', async (req, res) => {
      const {TMDbLogic, path, query} = req;
      const tmdbData = await TMDbLogic.request({path, query});
      res.json(tmdbData);
    })
  );
  return router;
};
