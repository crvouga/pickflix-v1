import { Handler, IRouter } from "express";
import { body, param, query, validationResult } from "express-validator";
import { TmdbMediaId, TmdbMediaType } from "../../../media/models/types";
import { User, UserId } from "../../../users/models/make-user";
import { ReviewId } from "../../models/make-review";
import { Dependencies } from "../types";

const handleValidationResult: Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

export const reviews = ({
  reviewLogic,
  middlewares,
  userLogic,
}: Dependencies) => (router: IRouter) => {
  router.get(
    "/users/:username/reviews",
    param("username").isString(),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const username = req.params.username as string;

        const user = await userLogic.getUser({ username });

        const reviewAggergations = await reviewLogic.getAllAggergations({
          authorId: user.id,
        });

        res.status(200).json(reviewAggergations).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/reviews",

    async (req, res, next) => {
      try {
        const authorId = req.query.authorId as UserId | undefined;
        const tmdbMediaId = Number(req.query.tmdbMediaId) as
          | TmdbMediaId
          | undefined;
        const tmdbMediaType = req.query.tmdbMediaType as
          | TmdbMediaType
          | undefined;

        let reviewInfo;

        if (authorId) {
          reviewInfo = {
            authorId,
          };
        }

        if (tmdbMediaId && tmdbMediaType) {
          reviewInfo = {
            tmdbMediaId,
            tmdbMediaType,
          };
        }

        if (authorId && tmdbMediaId && tmdbMediaType) {
          reviewInfo = {
            authorId,
            tmdbMediaId,
            tmdbMediaType,
          };
        }

        if (reviewInfo) {
          const reviewAggergations = await reviewLogic.getAllAggergations(
            reviewInfo
          );

          res.status(200).json(reviewAggergations).end();
        } else {
          res.status(400).json({ message: "invalid query params" }).end();
        }
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/reviews/:reviewId",
    middlewares.isAuthenticated,
    param("reviewId").isUUID(),
    handleValidationResult,
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
    body("rating").isInt(),
    body("tmdbMediaId").isInt(),
    body("tmdbMediaType").isIn(Object.values(TmdbMediaType)),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const authorId = currentUser.id;

        const title = req.body.title as string;
        const content = req.body.content as string;
        const rating = req.body.rating as number;
        const tmdbMediaId = Number(req.body.tmdbMediaId) as TmdbMediaId;
        const tmdbMediaType = req.body.tmdbMediaType as TmdbMediaType;

        const review = await reviewLogic.addReview({
          title,
          authorId,
          content,
          rating,
          tmdbMediaId,
          tmdbMediaType,
        });

        res.status(201).json(review).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    "/reviews/:reviewId",
    middlewares.isAuthenticated,
    param("reviewId").isUUID(),
    body("content").isString(),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const authorId = currentUser.id;
        const reviewId = req.params.reviewId as ReviewId;
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
    "/reviews/statistics",
    query("tmdbMediaId").isInt(),
    query("tmdbMediaType").isIn(Object.values(TmdbMediaType)),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const tmdbMediaId = Number(req.query.tmdbMediaId) as TmdbMediaId;
        const tmdbMediaType = req.query.tmdbMediaType as TmdbMediaType;

        const statistics = await reviewLogic.getRatingFrequency({
          tmdbMediaId,
          tmdbMediaType,
        });

        res.status(200).json(statistics).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
