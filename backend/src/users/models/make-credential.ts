import bcrypt from "bcrypt";
import { makeId, isValidId } from "../../app/id";
import { Id } from "../../app/id";
import { UserId, castUserId } from "./make-user";

export const makePasswordHash = (password: string) => bcrypt.hash(password, 10);
export const passwordHashCompare = (password: string, hash: string) =>
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
    return hash;
  }
  throw new Error("failed to cast password hash");
};

export const castVerifiedAt = (verifiedAt: any): number => {
  if (typeof verifiedAt === "number") {
    return verifiedAt as number;
  }
  throw new Error(
    `failed to cast credential verified at: ${verifiedAt.toString()}`
  );
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
      verifiedAt: castVerifiedAt(credential.verifiedAt),
    };
  }
  throw new Error("failed to cast credential");
};

export type CredentialPassword = {
  id: CredentialId;
  userId: UserId;
  credentialType: CredentialType.password;
  passwordHash: string;
  verifiedAt: number;
};

export type CredentialId = Id & { CredentialId: true };

export type Credential = CredentialPassword;

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
    verifiedAt: castVerifiedAt(Date.now()),
  };
};

export const updateCredential = (
  credential: Credential,
  edits: { verifiedAt: number }
): Credential => {
  return {
    id: castCredentialId(credential.id),
    credentialType: castCredentialType(credential.credentialType),
    userId: castUserId(credential.userId),
    passwordHash: castPasswordHash(credential.passwordHash),
    verifiedAt:
      "verifiedAt" in edits
        ? castVerifiedAt(edits.verifiedAt)
        : credential.verifiedAt,
  };
};
