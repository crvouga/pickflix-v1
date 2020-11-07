import { TmdbMediaType, Movie } from "../../tmdb/types";
import { User } from "../../auth/query";

export type Review = {
  id: string;
  authorId: string;
  content: string;
  rating: number;
  createdAt: number;
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export enum ReviewVoteValue {
  UP = "UP",
  DOWN = "DOWN",
}

export type ReviewAggergation = {
  author: User;
  review: Review;

  reviewVoteCount: number;
  reviewVoteValue: ReviewVoteValue | null;
  tmdbData: Movie;
};

export type ReviewVote = {
  id: string;
  userId: string;
  reviewId: string;
  voteValue: ReviewVoteValue;
};
