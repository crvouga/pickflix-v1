import {UserDb} from '../data-access/UserDb';
import {User} from '../business-entities/user';

export type GetByIds = (_: Partial<User>) => Promise<User | undefined>;

type Build = (dependencies: {userDb: UserDb}) => GetByIds;

export const buildGetByIds: Build = ({userDb}) => async userInfo => {
  const {id, firebaseId} = userInfo;
  if (!firebaseId && !id) {
    throw new Error('id required or firebase id required');
  }
  const found = await userDb.findByIds({firebaseId});

  return found;
};
