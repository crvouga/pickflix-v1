import {Dependencies, ListItem, ListId, ListItemId} from './types';
import {Id} from '../../id/types';
import {TmdbMediaType} from '../../media/models/types';
import {UserId} from '../../users/models/types';

export type PartialListItem = {
  id?: ListItemId;
  userId: UserId;
  listId: ListId;
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
  createdAt?: number;
};

export const buildMakeListItem = ({makeId, isValidId}: Dependencies) => (
  listItemInfo: PartialListItem
): ListItem => {
  const {
    id = makeId() as ListItemId,
    createdAt = Date.now(),
    userId,
    listId,
    tmdbMediaId,
    tmdbMediaType,
  } = listItemInfo;

  if (!isValidId(id)) {
    throw new Error('invalid id');
  }

  if (!listId) {
    throw new Error('list id required');
  }

  if (!isValidId(listId)) {
    throw new Error('invalid list id');
  }

  if (!userId) {
    throw new Error('user id required');
  }

  if (!isValidId(userId)) {
    throw new Error('invalid user id');
  }

  if (!tmdbMediaId) {
    throw new Error('tmdb id required');
  }

  if (tmdbMediaId && tmdbMediaId.length === 0) {
    throw new Error('invalid tmdb id');
  }

  if (!tmdbMediaType) {
    throw new Error('tmdb media type required');
  }

  if (!['movie', 'tv'].includes(tmdbMediaType)) {
    throw new Error('invalid tmdb media type');
  }

  return Object.freeze({
    type: 'listItem',
    id,
    userId,
    listId,
    tmdbMediaId,
    tmdbMediaType,
    createdAt,
  });
};
