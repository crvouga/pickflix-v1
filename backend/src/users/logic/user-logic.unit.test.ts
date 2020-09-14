import {buildUserLogicFake} from './user-logic.fake';

describe('user logic', () => {
  it('get by id user else create new user', async () => {
    const {UserLogic} = buildUserLogicFake();

    const firebaseId = '1234567890';
    const created = await UserLogic.createNew({firebaseId});
    const found = await UserLogic.getElseCreateNew({firebaseId});

    expect(found).toStrictEqual(created);
  });

  it('returns falsy when no user exists', async () => {
    const {UserLogic} = buildUserLogicFake();

    const firebaseId = '1234567890';
    const found = await UserLogic.getById({firebaseId});

    expect(found).toBeFalsy();
  });

  it('creates new users', async () => {
    const {UserLogic} = buildUserLogicFake();

    const firebaseId = '1234567890';
    const before = await UserLogic.getById({firebaseId});
    const created = await UserLogic.getElseCreateNew({firebaseId});
    const after = await UserLogic.getById({firebaseId});

    expect(before).toBeFalsy();
    expect(created).toStrictEqual(after);
  });
});
