import jwt from "jsonwebtoken";
import configuration from "../../../configuration";
import { UserId } from "../../models/make-user";

export type ResetPasswordTokenData = {
  createdAt: number;
  passwordVerifiedAt: number;
  passwordHash: string;
  userId: UserId;
  emailAddress: string;
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
    typeof createdAt === "number" &&
    typeof passwordHash === "string" &&
    typeof passwordVerifiedAt === "number" &&
    typeof emailAddress === "string" &&
    typeof userId === "string"
  ) {
    return {
      createdAt,
      passwordVerifiedAt,
      passwordHash,
      emailAddress,
      userId: userId as UserId,
    };
  }
  throw Error("Failed to cast token");
};

export const encodeToken = (token: ResetPasswordTokenData) => {
  return jwt.sign(token, configuration.SECRET);
};

export const decodeToken = (token: string): ResetPasswordTokenData => {
  if (!jwt.verify(token, configuration.SECRET)) {
    throw new Error("Failed to verify token");
  }
  return castResetPasswordTokenData(jwt.decode(token, { json: true }));
};
