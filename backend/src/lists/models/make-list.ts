import R from 'ramda';
import {BuildMakeList} from './types';

export const buildMakeList: BuildMakeList = ({makeId, isValidId}) => info => {
  const userIds = R.uniq(info?.userIds || []);

  const {id = makeId(), title = '', description = ''} = info;

  if (!isValidId(id)) {
    throw new Error('invalid id');
  }

  if (userIds.length === 0) {
    throw new Error('requires at least one unique user');
  }

  if (title?.length === 0) {
    throw new Error('title too short');
  }

  if (title?.length > 100) {
    throw new Error('title too long');
  }

  if (description?.length > 255) {
    throw new Error('description too long');
  }

  return {
    id,
    userIds,
    title,
    description,
  };
};
