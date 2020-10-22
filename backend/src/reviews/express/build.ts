import express, {IRouter} from 'express';
import {TmdbMediaType} from '../../media/models/types';
import {User} from '../../users/models/types';
import {ReviewId} from '../models/make-review';
import {Dependencies} from './types';

export const buildReviewsRouter = ({
  reviewLogic,
  middlewares,
}: Dependencies) => (router: IRouter) => {
  router.delete(
    '/reviews/:reviewId',
    middlewares.authenticate,
    async (req, res, next) => {
      try {
        const reviewId = req.params.reviewId as ReviewId;
        await reviewLogic.removeReviews([{id: reviewId}]);
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/reviews', middlewares.authenticate, async (req, res, next) => {
    try {
      const currentUser = req.currentUser as User;
      const authorId = currentUser.id;

      const content = req.body.content as string;
      const tmdbMediaId = req.body.tmdbMediaId as string;
      const tmdbMediaType = req.body.tmdbMediaType as TmdbMediaType;

      const review = await reviewLogic.addReview({
        authorId,
        content,
        tmdbMediaId,
        tmdbMediaType,
      });
      res.status(201).json(review).end();
    } catch (error) {
      next(error);
    }
  });

  router.patch(
    '/reviews/:reviewId',
    middlewares.authenticate,
    async (req, res, next) => {
      try {
        const currentUser = req.currentUser;
        const reviewId = req.params.reviewId as ReviewId;
        const authorId = currentUser.id;
        const content = req.body.content as string;

        const review = await reviewLogic.editReview({
          id: reviewId,
          authorId,
          content,
        });

        res.status(201).json(review).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/reviews',
    middlewares.attachCurrentUser,
    async (req, res, next) => {
      try {
        const currentUser = req.currentUser as User | undefined;
        const tmdbMediaId = req.query.tmdbMediaId as string;
        const tmdbMediaType = req.query.tmdbMediaType as TmdbMediaType;
        if (!tmdbMediaId || !tmdbMediaType) {
          return res.status(400).end();
        }

        const reviews = await reviewLogic.getReviewAggergations({
          userId: currentUser?.id,
          tmdbMediaId,
          tmdbMediaType,
        });

        res.status(200).json(reviews).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
