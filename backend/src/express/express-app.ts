import bodyParser from 'body-parser';
import express from 'express';
import cors from './middlewares/cors';
import {makeApiRouter} from './routes/router';
import {BuildExpressApp} from './types';

export const buildExpressApp: BuildExpressApp = ({
  attachCurrentUser,
  UserLogic,
  ListLogic,
  TMDbLogic,
  firebaseAdmin,
}) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use((req, res, next) => {
    req.ListLogic = ListLogic;
    req.UserLogic = UserLogic;
    req.TMDbLogic = TMDbLogic;
    req.firebaseAdmin = firebaseAdmin;
    next();
  });

  app.use(attachCurrentUser);
  app.use('/api', makeApiRouter());

  return {
    app,
  };
};
