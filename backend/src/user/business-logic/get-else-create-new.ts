import {User} from '../business-entities/user';
import {CreateNew} from './create-new';
import {GetByIds} from './get-by-ids';

export type GetElseCreateNew = (_: Partial<User>) => Promise<User>;

type Build = (dependencies: {
  createNew: CreateNew;
  getByIds: GetByIds;
}) => GetElseCreateNew;

export const buildGetElseCreateNew: Build = ({
  createNew,
  getByIds,
}) => async userInfo => {
  const got = await getByIds(userInfo);

  if (got) {
    return got;
  } else {
    const created = await createNew(userInfo);
    return created;
  }
};
