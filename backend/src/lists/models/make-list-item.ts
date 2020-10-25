import {TmdbMediaId, TmdbMediaType} from '../../media/models/types';
import {UserId} from '../../users/models/make-user';
import {Dependencies, ListId, ListItem, ListItemId} from './types';

export type PartialListItem = {
  id?: ListItemId;
  userId: UserId;
  listId: ListId;
  tmdbMediaId: TmdbMediaId;
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

  if (!isValidId(listId)) {
    throw new Error('invalid list id');
  }

  if (!isValidId(userId)) {
    throw new Error('invalid user id');
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
