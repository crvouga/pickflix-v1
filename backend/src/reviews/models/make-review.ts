import { Id } from "../../id/types";
import { makeId, isValidId } from "../../id";
import { UserId } from "../../users/models/make-user";
import { TmdbMediaType, TmdbMediaId } from "../../media/models/types";

export type ReviewId = Id & { ReviewId: true };

export type Review = {
  id: ReviewId;
  authorId: UserId;
  title: string;
  content: string;
  createdAt: number;
  rating: number;
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
};

export type PartialReview = {
  id?: ReviewId;
  authorId: UserId;
  title: string;
  content: string;
  rating: number;
  createdAt?: number;
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
};

const MAX_RATING = 5;
const MIN_RATING = 0;
const MIN_CONTENT_LENGTH = 1;
const MAX_CONTENT_LENGTH = 600;
const MIN_TITLE_LENGTH = 1;
const MAX_TITLE_LENGTH = 50;

export const makeReview = (partial: PartialReview): Review => {
  const id = partial.id || (makeId() as ReviewId);
  const authorId = partial.authorId;
  const title = partial.title.trim();
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

  if (content.length < MIN_CONTENT_LENGTH) {
    throw new Error(
      `Content can not be less than ${MIN_CONTENT_LENGTH} characters long.`
    );
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    throw new Error(
      `Content can not be greater than ${MAX_CONTENT_LENGTH} characters long.`
    );
  }

  if (title.length < MIN_TITLE_LENGTH) {
    throw new Error(
      `Content can not be less than ${MIN_TITLE_LENGTH} characters long.`
    );
  }

  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(
      `Title can not be greater than ${MAX_TITLE_LENGTH} characters long.`
    );
  }

  return Object.freeze({
    id,
    authorId,
    content,
    title,
    rating,
    createdAt,
    tmdbMediaId,
    tmdbMediaType,
  });
};
