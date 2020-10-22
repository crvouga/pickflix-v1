import { TmdbMediaType } from "../../tmdb/types";

export type Review = {
  id: string;
  authorId: string;
  content: string;
  createdAt: number;
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export enum ReviewVoteValue {
  UP = "UP",
  DOWN = "DOWN",
}

export type ReviewAggergation = {
  review: Review;
  reviewVoteCount: number;
  reviewVoteValue: ReviewVoteValue | null;
};

export type ReviewVote = {
  id: string;
  userId: string;
  reviewId: string;
  voteValue: ReviewVoteValue;
};
