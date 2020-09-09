import bodyParser from 'body-parser';
import express from 'express';
import cors from './cors';
import router from './router';
import {useSwaggerDocs} from './swagger';

export default async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use('/api', router());

  useSwaggerDocs(app);

  return app;
};
