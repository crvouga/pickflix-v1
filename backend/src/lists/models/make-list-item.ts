import {BuildMakeListItem} from './types';

export const buildMakeListItem: BuildMakeListItem = ({
  makeId,
  isValidId,
}) => ListItemInfo => {
  const {id = makeId(), listId, tmdbMediaId, tmdbMediaType} = ListItemInfo;

  if (!isValidId(id)) {
    throw new Error('invalid id');
  }

  if (!listId) {
    throw new Error('list id required');
  }

  if (!isValidId(listId)) {
    throw new Error('invalid list id');
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

  return {
    id,
    listId,
    tmdbMediaId,
    tmdbMediaType,
  };
};
