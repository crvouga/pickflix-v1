import { makeUser } from ".";
import {
  User,
  castUser,
  castEmailAddress,
  castDisplayName,
  castUsername,
} from "./make-user";
import { castPassword } from "./make-credential";

export const FAKE_USER_INFO = {
  emailAddress: castEmailAddress("testEmail@email.com"),
  displayName: castDisplayName("Chris"),
  username: castUsername("crvouga"),
  password: castPassword("password"),
};

export const makeUserFake = (
  overrides?:
    | {
        username?: string;
        emailAddress?: string;
        displayName?: string;
      }
    | Partial<User>
): User => {
  return castUser({
    ...makeUser({
      emailAddress: "test@gmail.com",
      username: "bobsmith",
      displayName: "Bob Smith",
    }),
    ...overrides,
  });
};
