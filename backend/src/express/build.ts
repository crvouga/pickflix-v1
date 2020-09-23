import bodyParser from 'body-parser';
import express from 'express';
import cors from './middlewares/cors';
import {Dependencies} from './types';
import {buildRouter} from './build-router';

export const buildExpressApp = (dependencies: Dependencies) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use('/api', buildRouter(dependencies));

  return {
    app,
  };
};
