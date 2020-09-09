import {makeUser} from '.';

export const makeTestUser = (overrides = {}) => {
  return makeUser({
    firebaseId: '1234567890',
    ...overrides,
  });
};
