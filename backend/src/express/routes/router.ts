import {IRouter, Router} from 'express';
import glob from 'glob';

type MakeRouter = () => IRouter;

export const makeApiRouter: MakeRouter = () => {
  const paths = glob.sync('**/index.ts', {cwd: `${__dirname}/`});

  const attachRoutes = paths.map(path => require(`./${path}`).default);

  const router = attachRoutes.reduce(
    (rootRouter, attachRoute) => attachRoute(rootRouter),
    Router({mergeParams: true})
  );

  return router;
};
