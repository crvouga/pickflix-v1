import bodyParser from 'body-parser';
import express from 'express';
import {todo} from '../../todo-list/http';
import env from '../configuration';
import adpat from './adapter';
import cors from './cors';
import tmdbRouter from './tmdb';
import youtubeRouter from './youtube';

const {PORT} = env;

export default async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.all('/api/todo', adpat(todo));
  app.all('/api/todo/:id', adpat(todo));
  app.use('/api/tmdb', tmdbRouter);
  app.use('/api/youtube', youtubeRouter);

  app.listen(PORT, () => {
    console.log(
      '################################################\n' +
        `Server listening on port: ${PORT}\n` +
        '################################################'
    );
  });
};
