import {buildUserStorage} from '../storage/user-storage.fake';
import {buildUserLogic} from './user-logic';

const build = () => {
  const UserStorage = buildUserStorage();
  const UserLogic = buildUserLogic({UserStorage});
  return UserLogic;
};

describe('user logic', () => {
  it('get by id user else create new user', async () => {
    const UserLogic = build();

    const firebaseId = '1234567890';
    const created = await UserLogic.createNew({firebaseId});
    const found = await UserLogic.getElseCreateNew({firebaseId});

    expect(found).toStrictEqual(created);
  });

  it('returns falsy when no user exists', async () => {
    const UserLogic = build();

    const firebaseId = '1234567890';
    const found = await UserLogic.getById({firebaseId});

    expect(found).toBeFalsy();
  });

  it('creates new users', async () => {
    const {getById, getElseCreateNew} = build();

    const firebaseId = '1234567890';
    const before = await getById({firebaseId});
    const created = await getElseCreateNew({firebaseId});
    const after = await getById({firebaseId});

    expect(before).toBeFalsy();
    expect(created).toStrictEqual(after);
  });
});
