import {BuildMakeUser} from './types';

export const buildMakeUser: BuildMakeUser = ({
  makeId,
  isValidId,
}) => userInfo => {
  const {id = makeId(), firebaseId} = userInfo;

  if (!isValidId(id)) {
    throw new Error('invalid id: ' + id);
  }

  if (!firebaseId) {
    throw new Error('firebaseId is required');
  }

  return {
    id,
    firebaseId,
  };
};
