import {Id, MakeId, IsValidId} from '../../id/types';

export interface User {
  id: Id;
  firebaseId: string;
}

export type BuildMakeUser = (_: {
  makeId: MakeId;
  isValidId: IsValidId;
}) => (_: Partial<User>) => User;
