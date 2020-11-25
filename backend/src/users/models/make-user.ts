import * as EmailValidator from "email-validator";
import { isNullOrUndefined } from "util";
import { isValidId, makeId } from "../../common/id";
import { Id } from "../../common/id/types";

export type UserId = Id & { UserId: true };

export type User = {
  type: "user";
  id: UserId;
  username: string;
  emailAddress: string;
  displayName: string;
};

export const castUserId = (userId: any) => {
  if (isValidId(userId)) {
    return userId as UserId;
  }
  throw new Error("invalid userId");
};

const USERNAME_REGEXP = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const MAX_USERNAME_LENGTH = 16;
const MIN_USERNAME_LENGTH = 2;

export const castUsername = (username: any) => {
  if (typeof username !== "string") {
    throw new Error("username must be a string");
  }

  if (username.length < MIN_USERNAME_LENGTH) {
    throw new Error("username too short");
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    throw new Error("username too long");
  }

  if (!USERNAME_REGEXP.test(username)) {
    throw new Error("invalid username");
  }
  return username;
};

export const castEmailAddress = (emailAddress: any) => {
  if (typeof emailAddress !== "string") {
    throw new Error("emailAdress must be a string");
  }

  if (!EmailValidator.validate(emailAddress)) {
    throw new Error("invalid emailAddress");
  }

  return emailAddress;
};

const MAX_DISPLAY_NAME_LENGTH = 30;

export const castDisplayName = (displayName: any) => {
  if (typeof displayName !== "string") {
    throw new Error("displayName must be a string");
  }

  if (displayName.length > MAX_DISPLAY_NAME_LENGTH) {
    throw new Error("displayName is too long");
  }

  return displayName;
};

export const castUser = (user: any) => {
  if (
    "id" in user &&
    "username" in user &&
    "emailAddress" in user &&
    "displayName" in user
  ) {
    return {
      type: "user",
      id: castUserId(user.id),
      username: castUsername(user.username),
      emailAddress: castEmailAddress(user.emailAddress),
      displayName: castDisplayName(user.displayName),
    } as User;
  }
  throw new Error("invalid user");
};

const makeUserId = () => {
  return makeId() as UserId;
};

export const makeUser = ({
  emailAddress,
  username,
  displayName,
}: {
  username: string;
  emailAddress: string;
  displayName?: string;
}): User => {
  return Object.freeze({
    type: "user",
    id: makeUserId(),
    emailAddress: castEmailAddress(emailAddress),
    username: castUsername(username),
    displayName: castDisplayName(displayName),
  });
};

export const updateUser = (
  user: User,
  {
    displayName,
    emailAddress,
    username,
  }: { displayName?: string; emailAddress?: string; username?: string }
) => {
  return {
    ...castUser(user),

    ...(isNullOrUndefined(displayName)
      ? {}
      : { displayName: castDisplayName(displayName) }),

    ...(isNullOrUndefined(emailAddress)
      ? {}
      : { emailAddress: castEmailAddress(emailAddress) }),

    ...(isNullOrUndefined(username)
      ? {}
      : { username: castUsername(username) }),
  };
};
