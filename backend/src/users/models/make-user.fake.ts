import {makeUser} from '.';

export const makeUserFake = (overrides = {}) => {
  return makeUser({
    firebaseId: '1234567890',
    ...overrides,
  });
};
