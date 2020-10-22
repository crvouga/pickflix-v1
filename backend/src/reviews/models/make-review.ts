import {Id} from '../../id/types';
import {makeId, isValidId} from '../../id';
import {UserId} from '../../users/models/types';
import {TmdbMediaType, TmdbMediaId} from '../../media/models/types';

export type ReviewId = Id & {ReviewId: true};

export type Review = {
  id: ReviewId;
  authorId: UserId;
  content: string;
  createdAt: number;
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
};

export type PartialReview = {
  id?: ReviewId;
  authorId: UserId;
  content: string;
  createdAt?: number;
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
};

export const makeReview = (partial: PartialReview): Review => {
  const id = partial.id || (makeId() as ReviewId);
  const authorId = partial.authorId;
  const content = partial.content.trim();
  const createdAt = partial.createdAt || Date.now();
  const tmdbMediaId = partial.tmdbMediaId;
  const tmdbMediaType = partial.tmdbMediaType;

  if (!isValidId(id)) {
    throw new Error('invalid id');
  }

  if (!isValidId(authorId)) {
    throw new Error('invalid author id');
  }

  if (content.length === 0) {
    throw new Error('content can not be empty');
  }
  return Object.freeze({
    id,
    authorId,
    content,
    createdAt,
    tmdbMediaId,
    tmdbMediaType,
  });
};
