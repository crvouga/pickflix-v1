import { makeUser } from ".";
import { User } from "./make-user";

export const makeUserFake = (overrides?: Partial<User>): User => {
  return {
    ...makeUser({
      emailAddress: "test@gmail.com",
      username: "bobsmith",
      displayName: "Bob Smith",
    }),
    ...overrides,
  };
};
