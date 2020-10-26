import express, {IRouter} from 'express';
import {Dependencies} from '../types';

export const youtube = ({mediaLogic}: Dependencies) => (router: IRouter) => {
  router.use(
    '/youtube',
    express.Router().all('*', async (req, res, next) => {
      try {
        const path = req.path as string;
        const query = req.query as {[key: string]: string};
        const data = await mediaLogic.requestYoutubeData({path, query});
        res.json(data);
      } catch (error) {
        next(error);
      }
    })
  );
};
