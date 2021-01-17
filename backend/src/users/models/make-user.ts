import * as EmailValidator from "email-validator";
import { isNullOrUndefined } from "util";
import { isValidId, makeId } from "../../common/id";

export type UserId = string & { _: "UserId" };
export type Username = string & { _: "Username" };
export type EmailAddress = string & { _: "EmailAddress" };
export type DisplayName = string & { _: "DisplayName" };

export type User = {
  id: UserId;
  username: Username;
  emailAddress: EmailAddress;
  displayName: DisplayName;
};

export const castUserId = (userId: any) => {
  if (isValidId(userId)) {
    return userId as UserId;
  }
  throw new Error(`invalid userId: ${userId}`);
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
  return username as Username;
};

export const castEmailAddress = (emailAddress: any) => {
  if (typeof emailAddress !== "string") {
    throw new Error("emailAddress must be a string");
  }

  if (!EmailValidator.validate(emailAddress)) {
    throw new Error("invalid email address");
  }

  return emailAddress as EmailAddress;
};

const MAX_DISPLAY_NAME_LENGTH = 30;

export const castDisplayName = (displayName: any) => {
  if (typeof displayName !== "string") {
    throw new Error("displayName must be a string");
  }

  if (displayName.length > MAX_DISPLAY_NAME_LENGTH) {
    throw new Error("displayName is too long");
  }

  return displayName as DisplayName;
};

export const castUser = (user: any): User => {
  if (
    "id" in user &&
    "username" in user &&
    "emailAddress" in user &&
    "displayName" in user
  ) {
    return {
      id: castUserId(user.id),
      username: castUsername(user.username),
      emailAddress: castEmailAddress(user.emailAddress),
      displayName: castDisplayName(user.displayName),
    };
  }
  throw new Error("failed to cast user");
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
    id: castUserId(makeId()),
    emailAddress: castEmailAddress(emailAddress),
    username: castUsername(username),
    displayName: castDisplayName(displayName ? displayName : ""),
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
  return castUser({
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
  });
};
