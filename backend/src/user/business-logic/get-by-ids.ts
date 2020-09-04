import {UserDb} from '../data-access/UserDb';
import {User} from '../business-entities/user';

export type GetByIds = (_: Partial<User>) => Promise<User | undefined>;
type Dependencies = {
  userDb: UserDb;
};
type Build = (_: Dependencies) => GetByIds;

const build: Build = ({userDb}) => async userInfo => {
  const {id, firebaseId} = userInfo;
  if (!firebaseId && !id) {
    throw new Error('id required or firebase id required');
  }
  const found = await userDb.findByIds({firebaseId});

  return found;
};

export default build;
