import bodyParser from 'body-parser';
import express from 'express';
import cors from './cors';
import {Dependencies} from './types';
import {buildRouter} from './build-router';

export const buildExpressApp = (dependencies: Dependencies) => (
  app: express.Application
) => {
  app.use(bodyParser.json());
  app.use(cors());
  buildRouter(dependencies)(app);
  return {app};
};
