import { isValidId, makeId } from "../../common/id";
import { Id } from "../../common/id/types";
import { UserId } from "../../users/models/make-user";
import { ReviewId } from "./make-review";

export enum ReviewVoteValue {
  UP = "UP",
  DOWN = "DOWN",
}

export type ReviewVoteId = Id & { ReviewVoteId: true };

export type ReviewVote = {
  id: ReviewVoteId;
  userId: UserId;
  reviewId: ReviewId;
  voteValue: ReviewVoteValue;
};

export type PartialReviewVote = {
  id?: ReviewVoteId;
  userId: UserId;
  reviewId: ReviewId;
  voteValue: ReviewVoteValue;
};

export const makeReviewVote = (partial: PartialReviewVote): ReviewVote => {
  const id = partial.id || (makeId() as ReviewVoteId);
  const { userId, reviewId, voteValue } = partial;

  if (!isValidId(id)) {
    throw new Error("invalid id");
  }

  if (!isValidId(userId)) {
    throw new Error("invalid user id");
  }

  if (!isValidId(reviewId)) {
    throw new Error("invalid review id");
  }

  if (!voteValue) {
    throw new Error("invalid vote value");
  }

  return Object.freeze({
    id,
    userId,
    reviewId,
    voteValue,
  });
};
