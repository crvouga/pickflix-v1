import {Router} from 'express';
import glob from 'glob';
import {BuildRouter} from '../types';

export const buildApiRouter: BuildRouter = dependencies => {
  const paths = glob.sync('**/build.ts', {cwd: `${__dirname}/`});

  const modules = paths.map(path => require(`./${path}`));

  const router = modules.reduce(
    (rootRouter, module) => module.build(dependencies)(rootRouter),
    Router({mergeParams: true})
  );

  return router;
};
