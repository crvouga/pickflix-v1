import express, {IRouter} from 'express';
import {Dependencies} from '../types';

export const tmdb = ({mediaLogic}: Dependencies) => (router: IRouter) => {
  router.use(
    '/tmdb',
    express
      .Router()

      .all('*', async (req, res) => {
        const path = req.path as string;
        const query = req.query as {[key: string]: string};
        const data = await mediaLogic.requestTmdbData({path, query});
        res.json(data);
      })
  );
};
