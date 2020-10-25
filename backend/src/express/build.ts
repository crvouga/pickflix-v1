import bodyParser from 'body-parser';
import {Application} from 'express';
import {buildAuthMiddleware} from '../users/express/build-auth-middleware';
import {buildRouter} from './build-router';
import {ExpressAppDependencies} from './types';

const buildMiddleware = (dependencies: ExpressAppDependencies) => (
  app: Application
) => {
  app.use(bodyParser.json());

  buildAuthMiddleware(dependencies)(app);
};

export const buildExpressApp = (dependencies: ExpressAppDependencies) => (
  app: Application
) => {
  buildMiddleware(dependencies)(app);
  buildRouter(dependencies)(app);
  return {
    app,
  };
};
