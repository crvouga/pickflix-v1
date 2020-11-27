import bcrypt from "bcrypt";
import { makeId } from "../../app/id";
import { Id } from "../../app/id";
import { UserId } from "./make-user";

export const makePasswordHash = (password: string) => bcrypt.hash(password, 10);
export const passwordHashCompare = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export enum CredentialType {
  password = "password",
}

export type CredentialPassword = {
  type: CredentialType.password;
  passwordHash: string;
  verifiedAt: number;
};

export type CredentialId = Id & { CredentialId: true };

export type Credential = CredentialPassword & {
  type: CredentialType;
  id: CredentialId;
  userId: UserId;
};

export const makeCredential = ({
  id,
  userId,
  passwordHash,
  verifiedAt,
}: {
  id?: CredentialId;
  userId: UserId;
  passwordHash: string;
  verifiedAt: number;
}): Credential => {
  return {
    id: id || (makeId() as CredentialId),
    type: CredentialType.password,
    userId,
    passwordHash,
    verifiedAt,
  };
};
