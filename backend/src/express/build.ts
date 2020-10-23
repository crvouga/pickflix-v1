import bodyParser from 'body-parser';
import express from 'express';
import cors from './cors';
import {ExpressAppDependencies} from './types';
import {buildRouter} from './build-router';
import {buildPassport} from '../users/express/build-passport';

export const buildExpressApp = (dependencies: ExpressAppDependencies) => (
  app: express.Application
) => {
  app.use(bodyParser.json());
  app.use(cors());
  buildPassport(dependencies)(app);
  buildRouter(dependencies)(app);

  return {app};
};
