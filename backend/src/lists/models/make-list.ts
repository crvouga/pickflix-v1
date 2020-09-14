import R from 'ramda';
import {BuildMakeList} from './types';

const maxLengthTitle = 100;
const maxLengthDescription = 500;

export const buildMakeList: BuildMakeList = ({makeId, isValidId}) => info => {
  const {id = makeId(), title = '', description = ''} = info;

  const userIds = R.uniq(info?.userIds || []);

  const errors = [];

  if (!isValidId(id)) {
    errors.push({for: 'listId', message: `invalid id ${id}`});
  }

  if (userIds.some(userId => !isValidId(userId))) {
    errors.push({for: 'userIds', message: `invalid userId`});
  }

  if (userIds.length === 0) {
    errors.push({for: 'userIds', message: `requires at least one user`});
  }

  if (title?.length === 0) {
    errors.push({for: 'title', message: 'title can NOT be empty'});
  }

  if (title?.length > maxLengthTitle) {
    errors.push({
      for: 'title',
      message: `title can NOT be more than ${maxLengthTitle} characters long`,
    });
  }

  if (description?.length > maxLengthDescription) {
    errors.push({
      for: 'description',
      message: `title can NOT be more than ${maxLengthTitle} characters long`,
    });
  }

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }

  return Object.freeze({
    id,
    userIds,
    title,
    description,
  });
};
