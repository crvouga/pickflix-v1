import {IRouter} from 'express';
import {Dependencies} from '../types';
import {TmdbMedia} from '../../models/types';

export const like = ({mediaLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.use(middlewares.attachCurrentUser);

  router.get('/like', async (req, res) => {
    const tmdbMediaId = req.query.tmdbMediaId;
    const tmdbMediaType = req.query.tmdbMediaType;

    if (
      typeof tmdbMediaId === 'string' &&
      (tmdbMediaType === 'movie' || tmdbMediaType === 'person')
    ) {
      const tmdbMedia: TmdbMedia = {
        tmdbMediaId,
        tmdbMediaType,
      };

      const isLiked = await mediaLogic.isLiked(tmdbMedia);
      res.json({isLiked}).end();
    } else {
      res.status(400).end();
    }
  });

  router.post('/like', async (req, res) => {
    const {tmdbMediaId, tmdbMediaType} = req.body;
    await mediaLogic.addLike({tmdbMediaId, tmdbMediaType});
    res.status(201).end();
  });

  router.delete('/like', async (req, res) => {
    const {tmdbMediaId, tmdbMediaType} = req.body;
    await mediaLogic.removeLike({tmdbMediaId, tmdbMediaType});
    res.status(200).end();
  });
};
