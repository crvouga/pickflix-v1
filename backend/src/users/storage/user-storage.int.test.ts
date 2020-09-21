import {clearTestDb, makeTestDb} from '../../unit-of-work/postgres/makeTestDb';
import {makeUser} from '../models';
import {buildUserStorage} from './user-storage';

const userDb = buildUserStorage({makeDb: makeTestDb});

describe('user db', () => {
  beforeAll(async () => {
    await clearTestDb();
  });

  afterAll(async () => {
    await clearTestDb();
  });

  it('inserts a user and returns the same user', async () => {
    const user = makeUser({firebaseId: '1234567890'});
    const inserted = await userDb.insert(user);
    expect(inserted).toStrictEqual(user);
  });

  it('list users', async () => {
    const inserts = await Promise.all(
      [
        makeUser({firebaseId: '1'}),
        makeUser({firebaseId: '2'}),
        makeUser({firebaseId: '3'}),
      ].map(userDb.insert)
    );
    const found = await userDb.findAll();

    inserts.forEach(insert => {
      expect(found).toContainEqual(insert);
    });
  });

  it('finds user by id', async () => {
    const inserted = await userDb.insert(makeUser({firebaseId: '4'}));
    const found = await userDb.findById(inserted.id);
    expect(found).toStrictEqual(inserted);
  });

  it('finds user by ids', async () => {
    const firebaseId = '5';
    const inserted = await userDb.insert(makeUser({firebaseId}));
    const found = await userDb.findByIds({
      firebaseId,
    });
    expect(found).toStrictEqual(inserted);
  });

  it('removes user', async () => {
    const inserted = await userDb.insert(makeUser({firebaseId: '6'}));
    const before = await userDb.findById(inserted.id);
    await userDb.remove(inserted.id);
    const after = await userDb.findById(inserted.id);
    expect(before).toStrictEqual(inserted);
    expect(after).toBeFalsy();
  });
});
