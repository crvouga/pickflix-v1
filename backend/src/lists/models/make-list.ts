import {BuildMakeList} from './types';
import {Id} from '../../id/types';

const maxLengthTitle = 100;
const maxLengthDescription = 500;

export const buildMakeList: BuildMakeList = ({
  makeId,
  isValidId,
}) => listInfo => {
  const {
    id = makeId(),
    ownerId = '' as Id,
    title = '',
    description = '',
    createdAt = Date.now(),
    isAutoMade = false,
    isPrivate = false,
  } = listInfo;

  const errors = [];

  if (!isValidId(ownerId)) {
    errors.push({for: 'ownerId', message: 'invalid ownerId'});
  }

  if (!isValidId(id)) {
    errors.push({for: 'listId', message: `invalid id ${id}`});
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
    ownerId,
    title,
    description,
    createdAt,
    isAutoMade,
    isPrivate,
  });
};
