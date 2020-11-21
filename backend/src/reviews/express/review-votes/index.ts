import { Handler, IRouter } from "express";
import { validationResult } from "express-validator";
import { User } from "../../../users/models/make-user";
import { ReviewId } from "../../models/make-review";
import { ReviewVoteValue } from "../../models/make-review-vote";
import { Dependencies } from "../types";

export const reviewVotes = ({ reviewLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.post(
    "/reviews/:reviewId/review-votes",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const userId = currentUser.id;
        const reviewId = req.params.reviewId as ReviewId;
        const voteValue = req.body.voteValue as ReviewVoteValue;

        const reviewVote = await reviewLogic.castReviewVote({
          userId,
          reviewId,
          voteValue,
        });

        res.status(201).json(reviewVote).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/reviews/:reviewId/review-votes",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const userId = currentUser.id;
        const reviewId = req.params.reviewId as ReviewId;

        await reviewLogic.uncastReviewVote({
          reviewId,
          userId,
        });
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
