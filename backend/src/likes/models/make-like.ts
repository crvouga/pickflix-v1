import {IsValidId, Id} from '../../id/types';
import {Like} from './types';

type Dependencies = {
  isValidId: IsValidId;
  makeId: () => Id;
};

export const buildMakeLike = ({isValidId, makeId}: Dependencies) => ({
  userId,
  entityId,
}: {
  userId: Id;
  entityId: Id;
}): Like => {
  const id = makeId();

  if (!isValidId(userId)) {
    throw new Error('invalid user id');
  }

  if (!isValidId(entityId)) {
    throw new Error('invalid entity id');
  }

  return Object.freeze({
    id,
    userId,
    entityId,
  });
};
