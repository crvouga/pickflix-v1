import { Id } from "../../id/types";
import { makeId, isValidId } from "../../id";
import { UserId } from "../../users/models/make-user";
import { TmdbMediaType, TmdbMediaId } from "../../media/models/types";

export type ReviewId = Id & { ReviewId: true };

export type Review = {
  id: ReviewId;
  authorId: UserId;
  content: string;
  createdAt: number;
  rating: number;
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
};

export type PartialReview = {
  id?: ReviewId;
  authorId: UserId;
  content: string;
  rating: number;
  createdAt?: number;
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
};

const MAX_RATING = 5;
const MIN_RATING = 0;

export const makeReview = (partial: PartialReview): Review => {
  const id = partial.id || (makeId() as ReviewId);
  const authorId = partial.authorId;
  const content = partial.content.trim();
  const rating = partial.rating;
  const createdAt = partial.createdAt || Date.now();
  const tmdbMediaId = partial.tmdbMediaId;
  const tmdbMediaType = partial.tmdbMediaType;

  if (!isValidId(id)) {
    throw new Error("invalid id");
  }

  if (!isValidId(authorId)) {
    throw new Error("invalid author id");
  }

  if (rating > MAX_RATING) {
    throw new Error(`Rating can not be greater than ${MAX_RATING}`);
  }

  if (rating < MIN_RATING) {
    throw new Error(`Rating can not be less than ${MIN_RATING}`);
  }

  if (content.length === 0) {
    throw new Error("content can not be empty");
  }
  return Object.freeze({
    id,
    authorId,
    content,
    rating,
    createdAt,
    tmdbMediaId,
    tmdbMediaType,
  });
};
