import { Handler, IRouter } from "express";
import { validationResult } from "express-validator";
import { User, castUserId } from "../../../users/models/make-user";
import { ReviewId, castReviewId } from "../../models/make-review";
import { castReviewVoteValue } from "../../models/make-review-vote";
import { Dependencies } from "../types";

export const reviewVotes = ({ reviewLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.post(
    "/reviews/:reviewId/review-votes",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const userId = castUserId(req.user?.id);

        const reviewId = castReviewId(req.params.reviewId);

        const voteValue = req.body.voteValue
          ? castReviewVoteValue(req.body.voteValue)
          : null;

        const isVotedOn = await reviewLogic.setReviewVote({
          userId,
          reviewId,
          voteValue,
        });

        if (isVotedOn) {
          res.status(201).end();
        } else {
          res.status(204).end();
        }
      } catch (error) {
        next(error);
      }
    }
  );
};
