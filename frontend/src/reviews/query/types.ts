import { TmdbMediaType, Movie } from "../../tmdb/types";
import { User } from "../../users/query";

export type Review = {
  id: string;
  authorId: string;
  title: string;
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
  authorReviewCount: number;
  review: Review;
  reviewVoteCount: number;
  reviewVoteValue: ReviewVoteValue | null;
  mediaReviewCount: number;
  tmdbData: Movie;
};

export type ReviewVote = {
  id: string;
  userId: string;
  reviewId: string;
  voteValue: ReviewVoteValue;
};

export type ReviewStatistics = {
  ratingCount: number;
  ratingFrequency: {
    [rating: number]: number;
  };
  ratingAverage: number;
};

export const MIN_RATING = 1;
export const MAX_RATING = 5;
