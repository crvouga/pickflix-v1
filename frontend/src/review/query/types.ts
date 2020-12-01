import { TmdbMediaType, Movie, MediaId } from "../../media/tmdb/types";
import { User } from "../../user/query";

export type Review = {
  id: string;
  authorId: string;
  content: string;
  rating: number;
  mediaId: MediaId;
  createdAt: number;
  updatedAt: number;
};

export enum VoteValue {
  UP = "UP",
  DOWN = "DOWN",
}

export type ReviewAggergation = {
  author: User;
  authorReviewCount: number;
  review: Review;
  reviewVoteCount: number;
  reviewVoteValue: VoteValue | null;
  mediaReviewCount: number;
  tmdbData: Movie;
  reviewUpVoteCount: number;
};

export type ReviewVote = {
  id: string;
  userId: string;
  reviewId: string;
  voteValue: VoteValue;
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
