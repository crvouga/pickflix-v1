import bodyParser from 'body-parser';
import express from 'express';
import cors from './middlewares/cors';
import {buildApiRouter} from './routes';
import {BuildExpressApp} from './types';

export const buildExpressApp: BuildExpressApp = dependencies => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use('/api', buildApiRouter(dependencies));

  return {
    app,
  };
};
