import { isValidId, makeId } from "../../id";
import { Id } from "../../id/types";
import { TmdbMediaId, TmdbMediaType, MediaId } from "../../media/models/types";
import { UserId } from "../../users/models/make-user";

export type ReviewId = Id & { ReviewId: true };

export type Review = {
  id: ReviewId;
  authorId: UserId;
  content: string;
  createdAt: number;
  rating: number;
  mediaId: MediaId;
};

export const MAX_RATING = 5;
export const MIN_RATING = 1;
export const RATINGS = [1, 2, 3, 4, 5];

const MIN_CONTENT_LENGTH = 0;
const MAX_CONTENT_LENGTH = 600;

export type PartialReview = {
  authorId: UserId;
  content: string;
  rating: number;
  mediaId: MediaId;
};

export const makeReview = ({
  authorId,
  content,
  rating,
  mediaId,
}: PartialReview): Review => {
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

  return Object.freeze({
    id: makeId() as ReviewId,
    authorId,
    content,
    rating,
    createdAt: Date.now(),
    mediaId,
  });
};

export const updateReview = (
  review: Review,
  {
    rating,
    content,
  }: {
    rating?: number;
    content?: string;
  }
): Review => {
  return {
    ...review,
    ...(rating ? { rating } : {}),
    ...(content ? { content } : {}),
  };
};
