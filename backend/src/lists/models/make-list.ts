import {Dependencies, List} from './types';
import {Id} from '../../id/types';

const MAX_LENGTH_TITLE = 100;
const MAX_LENGTH_DESCRIPTION = 500;

export const buildMakeList = ({makeId, isValidId}: Dependencies) => (
  listInfo: Partial<List>
): List => {
  const {
    id = makeId(),
    ownerId = '' as Id,
    title = '',
    description = '',
    createdAt = Date.now(),
    visibility = 'public',
  } = listInfo;

  const errors = [];

  if (!isValidId(ownerId)) {
    errors.push({key: 'ownerId', message: 'invalid ownerId'});
  }

  if (!isValidId(id)) {
    errors.push({key: 'listId', message: `invalid id ${id}`});
  }

  if (title?.length === 0) {
    errors.push({key: 'title', message: 'title can NOT be empty'});
  }

  if (title?.length > MAX_LENGTH_TITLE) {
    errors.push({
      key: 'title',
      message: `title can NOT be more than ${MAX_LENGTH_TITLE} characters long`,
    });
  }

  if (description?.length > MAX_LENGTH_DESCRIPTION) {
    errors.push({
      key: 'description',
      message: `title can NOT be more than ${MAX_LENGTH_TITLE} characters long`,
    });
  }

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }

  return Object.freeze({
    type: 'list',
    id,
    ownerId,
    title,
    description,
    createdAt,
    visibility,
  });
};
