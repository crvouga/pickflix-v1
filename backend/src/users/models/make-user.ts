import {Dependencies, User} from './types';

export const buildMakeUser = ({makeId, isValidId}: Dependencies) => (
  userInfo: Partial<User>
): User => {
  const {id = makeId(), firebaseId} = userInfo;

  if (!isValidId(id)) {
    throw new Error('invalid id: ' + id);
  }

  if (!firebaseId) {
    throw new Error('firebaseId is required');
  }

  return Object.freeze({
    type: 'user',
    id,
    firebaseId,
  });
};
