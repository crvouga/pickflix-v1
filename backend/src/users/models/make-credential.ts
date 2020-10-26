import {makeId} from '../../id';
import {Id} from '../../id/types';
import {UserId} from './make-user';

export enum CredentialType {
  password = 'password',
}

export type CredentialPassword = {
  type: CredentialType.password;
  passwordHash: string;
};

export type CredentialId = Id & {CredentialId: true};

export type Credential = CredentialPassword & {
  type: CredentialType;
  id: CredentialId;
  userId: UserId;
};

export const makeCredential = ({
  userId,
  passwordHash,
}: {
  userId: UserId;
  passwordHash: string;
}): Credential => {
  return {
    type: CredentialType.password,
    id: makeId() as CredentialId,
    userId,
    passwordHash,
  };
};
