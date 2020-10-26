import {makeUser} from '.';

export const makeUserFake = (overrides = {}) => {
  return makeUser({
    email: 'test@gmail.com',
    username: 'iLikeMovies',
    displayName: 'Bob Smith',
    ...overrides,
  });
};
