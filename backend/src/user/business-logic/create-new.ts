import {makeUser} from '../business-entities';
import {User} from '../business-entities/user';
import {GetByIds} from './get-by-ids';
import {UserDb} from '../data-access/UserDb';

export type CreateNew = (_: Partial<User>) => Promise<User>;
type Dependencies = {
  getByIds: GetByIds;
  userDb: UserDb;
};
type Build = (_: Dependencies) => CreateNew;
const build: Build = ({getByIds, userDb}) => async (
  userInfo: Partial<User>
): Promise<User> => {
  const got = await getByIds(userInfo);

  if (got) {
    throw new Error('id(s) already being used');
  }

  const newUser = makeUser(userInfo);

  const inserted = await userDb.insert(newUser);

  return inserted;
};
export default build;
