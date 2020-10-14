import {Dependencies, AutoList, AutoListTitle} from './types';
import {Id} from '../../id/types';

export const buildMakeAutoList = ({makeId, isValidId}: Dependencies) => (
  listInfo: Partial<AutoList> & {title: AutoListTitle; ownerId: Id}
): AutoList => {
  const {
    id = makeId(),
    ownerId = '' as Id,
    title,
    createdAt = Date.now(),
  } = listInfo;

  if (!isValidId(ownerId)) {
    throw new Error('invalid owner id');
  }

  if (!isValidId(id)) {
    throw new Error('invalid list id');
  }

  if (!title || title?.length === 0) {
    throw new Error('invalid title');
  }

  return Object.freeze({
    type: 'autoList',
    id,
    ownerId,
    title,
    createdAt,
  });
};
