import fc from 'fast-check';
import buildUserDb from '../data-access/user-db.fake';
import buildCreateNew from './create-new';
import buildGetByIds from './get-by-ids';
import buildGetElseCreateNew from './get-else-create-new';

const build = () => {
  const userDb = buildUserDb();
  const getByIds = buildGetByIds({userDb});
  const createNew = buildCreateNew({getByIds, userDb});
  const getElseCreateNew = buildGetElseCreateNew({
    createNew,
    getByIds,
  });
  return {userDb, getByIds, createNew, getElseCreateNew};
};

describe('get by ids else create new', () => {
  it('creates new user with provided ids if no existing user', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string().filter(_ => _.length > 0),
        async firebaseId => {
          const {getByIds, getElseCreateNew} = build();

          const before = await getByIds({firebaseId});
          const created = await getElseCreateNew({firebaseId});
          const after = await getByIds({firebaseId});

          expect(before).toBeFalsy();
          expect(created).toStrictEqual(after);
        }
      )
    );
  });
});
