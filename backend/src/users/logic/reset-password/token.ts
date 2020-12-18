import jwt from "jsonwebtoken";
import { secrets } from "../../../config";
import { castTimestamp, makeTimestamp, Timestamp } from "../../../utils";
import {
  castPasswordHash,
  CredentialPassword,
  PasswordHash,
} from "../../models";
import {
  castEmailAddress,
  castUserId,
  EmailAddress,
  User,
  UserId,
} from "../../models/make-user";

export type ResetPasswordTokenData = {
  createdAt: Timestamp;
  passwordVerifiedAt: Timestamp;
  passwordHash: PasswordHash;
  userId: UserId;
  emailAddress: EmailAddress;
};

const castResetPasswordTokenData = (obj: any): ResetPasswordTokenData => {
  const {
    createdAt,
    passwordVerifiedAt,
    passwordHash,
    emailAddress,
    userId,
  } = obj;

  if (
    createdAt &&
    passwordHash &&
    passwordVerifiedAt &&
    emailAddress &&
    userId
  ) {
    return {
      createdAt: castTimestamp(createdAt),
      passwordVerifiedAt: castTimestamp(passwordVerifiedAt),
      passwordHash: castPasswordHash(passwordHash),
      emailAddress: castEmailAddress(emailAddress),
      userId: castUserId(userId),
    };
  }
  throw Error("Failed to cast token");
};

export const makeResetPasswordTokenData = ({
  passwordVerifiedAt,
  passwordHash,
  emailAddress,
  userId,
}: {
  passwordVerifiedAt: number;
  passwordHash: string;
  emailAddress: string;
  userId: UserId;
}): ResetPasswordTokenData => {
  return {
    createdAt: makeTimestamp(),
    passwordVerifiedAt: castTimestamp(passwordVerifiedAt),
    passwordHash: castPasswordHash(passwordHash),
    emailAddress: castEmailAddress(emailAddress),
    userId: castUserId(userId),
  };
};

export const makeResetPasswordToken = ({
  user,
  passwordCredential,
}: {
  user: User;
  passwordCredential: CredentialPassword;
}) => {
  return encodeToken(
    makeResetPasswordTokenData({
      passwordVerifiedAt: passwordCredential.verifiedAt,
      passwordHash: passwordCredential.passwordHash,
      emailAddress: user.emailAddress,
      userId: user.id,
    })
  );
};

export const encodeToken = (token: ResetPasswordTokenData) => {
  return jwt.sign(token, secrets.secret);
};

export const decodeToken = (token: string): ResetPasswordTokenData => {
  if (!jwt.verify(token, secrets.secret)) {
    throw new Error("Failed to decode token");
  }
  return castResetPasswordTokenData(jwt.decode(token, { json: true }));
};
