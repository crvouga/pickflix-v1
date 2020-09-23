import {Router, ErrorRequestHandler} from 'express';
import glob from 'glob';
import {BuildRouter} from '../types';

export const buildApiRouter: BuildRouter = dependencies => {
  const paths = glob.sync('**/build.ts', {cwd: `${__dirname}/`});

  const modules = paths.map(path => require(`./${path}`));

  const router = modules.reduce(
    (rootRouter, module) => module.build(dependencies)(rootRouter),
    Router({mergeParams: true})
  );

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
      console.error(err.stack);
      return res.status(400).send(err).end();
    } else {
      return next();
    }
  };

  router.use(errorHandler);

  return router;
};
