import { makeUser } from ".";

export const makeUserFake = (overrides = {}) => {
  return makeUser({
    emailAddress: "test@gmail.com",
    username: "iLikeMovies",
    displayName: "Bob Smith",
    ...overrides,
  });
};
