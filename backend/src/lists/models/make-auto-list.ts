import {UserId} from '../../users/models/types';
import {AutoList, AutoListKeys, Dependencies, ListId} from './types';

const autoListKeyToTitle: {[key in AutoListKeys]: string} = {
  'watch-next': 'Watch Next',
  liked: 'Liked',
};

export const buildMakeAutoList = ({
  makeId,
  isValidId,
}: Dependencies) => (listInfo: {
  id?: ListId;
  key: AutoListKeys;
  ownerId: UserId;
}): AutoList => {
  const {id = makeId() as ListId, ownerId, key} = listInfo;

  if (!isValidId(ownerId)) {
    throw new Error('invalid owner id');
  }

  if (!isValidId(id)) {
    throw new Error('invalid list id');
  }

  return Object.freeze({
    type: 'autoList',
    id,
    title: autoListKeyToTitle[key],
    ownerId,
    key,
  });
};
