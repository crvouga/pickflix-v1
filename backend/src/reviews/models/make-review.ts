import { Id, isValidId, makeId } from "../../app/id";
import { makeTimestamp, Timestamp } from "../../utils";
import { castMediaId, MediaId } from "../../media/models/types";
import { UserId } from "../../users/models/make-user";

export type ReviewId = Id & { ReviewId: true };
export type ReviewContent = string & { _: "ReviewContent" };
export type ReviewRating = number & { _: "ReviewRating" };

export const castReviewId = (id: any) => {
  if (isValidId(id)) {
    return id as ReviewId;
  }
  throw new Error("invalid review id");
};

export type Review = {
  id: ReviewId;
  authorId: UserId;
  content?: ReviewContent;
  rating: ReviewRating;
  mediaId: MediaId;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export const MAX_RATING = 5;
export const MIN_RATING = 1;

const MIN_CONTENT_LENGTH = 0;
const MAX_CONTENT_LENGTH = 600;

export type PartialReview = {
  authorId: UserId;
  content?: string;
  rating: number;
  mediaId: MediaId;
};

export const castReviewContent = (content: any) => {
  if (typeof content !== "string") {
    throw new Error("content must be a string");
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    throw new Error("content too long");
  }
  if (content.length < MIN_CONTENT_LENGTH) {
    throw new Error("content too short");
  }
  return content as ReviewContent;
};

export const castReviewRating = (_rating: any) => {
  const rating = Number(_rating);
  if (typeof rating !== "number") {
    throw new Error("rating must be a number");
  }
  if (rating > MAX_RATING) {
    throw new Error("rating too big");
  }
  if (rating < MIN_RATING) {
    throw new Error("rating too small");
  }
  return rating as ReviewRating;
};

export const RATINGS: ReviewRating[] = [1, 2, 3, 4, 5].map(castReviewRating);

export const castAuthorId = (authorId: any) => {
  if (!isValidId(authorId)) {
    throw new Error("invalid author id");
  }
  return authorId as UserId;
};

const makeReviewId = () => makeId() as ReviewId;

export const makeReview = ({
  authorId,
  content,
  rating,
  mediaId,
}: PartialReview): Review => {
  return Object.freeze({
    id: makeReviewId(),
    authorId: castAuthorId(authorId),
    content: castReviewContent(content || ""),
    rating: castReviewRating(rating),
    mediaId: castMediaId(mediaId),
    createdAt: makeTimestamp(),
    updatedAt: makeTimestamp(),
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
    ...(rating !== undefined ? { rating: castReviewRating(rating) } : {}),
    ...(content !== undefined ? { content: castReviewContent(content) } : {}),
    updatedAt: makeTimestamp(),
  };
};
