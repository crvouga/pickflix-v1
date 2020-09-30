import {IRouter} from 'express';
import {Dependencies} from '../types';
import {TmdbMedia} from '../../models/types';

export const like = ({mediaLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.use(middlewares.attachCurrentUser);

  router.get('/like', async (req, res, next) => {
    try {
      const tmdbMediaId = req.query.tmdbMediaId;
      const tmdbMediaType = req.query.tmdbMediaType;

      if (typeof tmdbMediaId !== 'string') {
        throw new Error('tmdb media id must be a string');
      }

      if (
        !(
          tmdbMediaType === 'movie' ||
          tmdbMediaType === 'person' ||
          tmdbMediaType === 'tv'
        )
      ) {
        throw new Error("tmdb media type must be 'movie' or 'person' or 'tv'");
      }

      const tmdbMedia: TmdbMedia = {
        tmdbMediaId,
        tmdbMediaType,
      };

      const isLiked = await mediaLogic.isLiked(tmdbMedia);
      res.json({isLiked}).end();
    } catch (error) {
      next(error);
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
