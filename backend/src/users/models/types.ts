import {IsValidId, MakeId} from '../../id/types';

export type Dependencies = {
  makeId: MakeId;
  isValidId: IsValidId;
};

export type UserId = string & {isUUID: true; isUserId: true};

export type FirebaseId = string & {isFirebaseId: true};

export type User = {
  type: 'user';
  id: UserId;
  firebaseId: FirebaseId;
};
