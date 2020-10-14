import {Id, MakeId, IsValidId} from '../../id/types';

export type User = {
  type: 'user';
  id: Id;
  firebaseId: string;
};

export type Dependencies = {
  makeId: MakeId;
  isValidId: IsValidId;
};
