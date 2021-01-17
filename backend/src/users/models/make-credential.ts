import bcrypt from "bcrypt";
import { isValidId, makeId } from "../../common/id";
import { Timestamp, castTimestamp, makeTimestamp } from "../../common/utils";
import { castUserId, UserId } from "./make-user";

export type CredentialPassword = {
  id: CredentialId;
  userId: UserId;
  credentialType: CredentialType.password;
  passwordHash: PasswordHash;
  verifiedAt: Timestamp;
};

export type CredentialId = string & { _: "CredentialId" };
export type Password = string & { _: "Password" };
export type PasswordHash = string & { _: "PasswordHash" };
export type Credential = CredentialPassword;

export const makePasswordHash = (password: Password) =>
  bcrypt.hash(password, 10);

export const passwordHashCompare = (password: Password, hash: PasswordHash) =>
  bcrypt.compare(password, hash);

export enum CredentialType {
  password = "password",
}

export const castCredentialType = (credentialType: any) => {
  if (
    typeof credentialType === "string" &&
    credentialType === CredentialType.password
  ) {
    return credentialType as CredentialType;
  }
  throw new Error("failed to cast credential type");
};

export const castCredentialId = (id: any) => {
  if (isValidId(id)) {
    return id as CredentialId;
  }
  throw new Error("failed to cast credential id");
};

export const castPasswordHash = (hash: any) => {
  if (typeof hash === "string") {
    return hash as PasswordHash;
  }
  throw new Error("failed to cast password hash");
};

export const castCredential = (credential: any): Credential => {
  if (
    "id" in credential &&
    "userId" in credential &&
    "credentialType" in credential &&
    "passwordHash" in credential &&
    "verifiedAt" in credential
  ) {
    return {
      id: castCredentialId(credential.id),
      userId: castUserId(credential.userId),
      credentialType: castCredentialType(credential.credentialType),
      passwordHash: castPasswordHash(credential.passwordHash),
      verifiedAt: castTimestamp(credential.verifiedAt),
    };
  }
  throw new Error("failed to cast credential");
};

export const castPassword = (password: any) => {
  if (typeof password === "string" && password.length > 0) {
    return password as Password;
  }
  throw new Error("failed to cast password");
};

export const makeCredential = ({
  userId,
  passwordHash,
}: {
  userId: UserId;
  passwordHash: string;
}): Credential => {
  return {
    id: castCredentialId(makeId()),
    credentialType: castCredentialType(CredentialType.password),
    userId: castUserId(userId),
    passwordHash: castPasswordHash(passwordHash),
    verifiedAt: makeTimestamp(),
  };
};

export const updateCredential = (
  credential: Credential,
  edits: { verifiedAt?: number; passwordHash?: string }
): Credential => {
  return {
    id: castCredentialId(credential.id),
    credentialType: castCredentialType(credential.credentialType),
    userId: castUserId(credential.userId),
    passwordHash: castPasswordHash(
      "passwordHash" in edits ? edits.passwordHash : credential.passwordHash
    ),
    verifiedAt: castTimestamp(
      "verifiedAt" in edits ? edits.verifiedAt : credential.verifiedAt
    ),
  };
};
