import {makeUser} from '.';
import {FirebaseId} from './types';

export const makeUserFake = (overrides = {}) => {
  return makeUser({
    firebaseId: '1234567890' as FirebaseId,
    ...overrides,
  });
};
