import {Dependencies, FirebaseId, UserId, User} from './types';

export type PartialUser = {
  id?: UserId;
  firebaseId: FirebaseId;
};

export const buildMakeUser = ({makeId, isValidId}: Dependencies) => (
  userInfo: PartialUser
): User => {
  const {id = makeId() as UserId, firebaseId} = userInfo;

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
