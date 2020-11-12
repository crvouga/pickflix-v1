import { IRouter } from "express";
import {
  castMediaId,
  MediaId,
  TmdbMediaId,
  TmdbMediaType,
} from "../../../media/models/types";
import { User, UserId } from "../../../users/models/make-user";
import { ReviewId } from "../../models/make-review";
import { Dependencies } from "../types";

export const reviews = ({
  reviewLogic,
  middlewares,
  userLogic,
}: Dependencies) => (router: IRouter) => {
  router.get("/reviews", async (req, res, next) => {
    try {
      const userId = (req.query.userId || req.user?.id) as UserId | undefined;

      const authorId = req.query.authorId as UserId | undefined;

      const tmdbMediaId = Number(req.query.tmdbMediaId) as
        | TmdbMediaId
        | undefined;
      const tmdbMediaType = req.query.tmdbMediaType as
        | TmdbMediaType
        | undefined;

      const mediaId: MediaId | undefined =
        tmdbMediaId && tmdbMediaType
          ? {
              tmdbMediaId,
              tmdbMediaType,
            }
          : undefined;

      const reviewAggergations = await reviewLogic.getAllAggergations({
        userId,
        authorId,
        mediaId,
      });

      res.status(200).json(reviewAggergations).end();
    } catch (error) {
      next(error);
    }
  });

  router.delete(
    "/reviews/:reviewId",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const reviewId = req.params.reviewId as ReviewId;
        await reviewLogic.removeReviews([{ id: reviewId }]);
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/reviews",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const authorId = currentUser.id;

        //
        const content = req.body.content as string | undefined;
        const rating = req.body.rating as number | undefined;
        const mediaId = req.body.mediaId as MediaId | undefined;

        if (!mediaId) {
          return res
            .status(400)
            .json({ message: "mediaId required in body" })
            .end();
        }

        const review = await reviewLogic.createOrUpdateReview({
          authorId,
          content,
          rating,
          mediaId,
        });

        res.status(201).json(review).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.get("/reviews/statistics", async (req, res, next) => {
    try {
      const tmdbMediaId = Number(req.query.tmdbMediaId) as
        | TmdbMediaId
        | undefined;

      const tmdbMediaType = req.query.tmdbMediaType as
        | TmdbMediaType
        | undefined;

      const mediaId: MediaId | undefined =
        tmdbMediaId && tmdbMediaType
          ? {
              tmdbMediaId,
              tmdbMediaType,
            }
          : undefined;

      if (!mediaId) {
        return res
          .status(400)
          .json({ message: "mediaId required in body" })
          .end();
      }

      const statistics = await reviewLogic.getRatingFrequency({
        mediaId,
      });

      res.status(200).json(statistics).end();
    } catch (error) {
      next(error);
    }
  });
};
