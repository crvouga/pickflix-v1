import { makeUser } from ".";
import { User, castUser } from "./make-user";

export const makeUserFake = (overrides?: Partial<User>): User => {
  return castUser({
    ...makeUser({
      emailAddress: "test@gmail.com",
      username: "bobsmith",
      displayName: "Bob Smith",
    }),
    ...overrides,
  });
};
