import R from 'ramda';
import fc from 'fast-check';
import buildUserIdsDb from '../data-access/user-db.fake';
import buildCreateNew from './create-new';
import buildGetByIds from './get-by-ids';

const build = () => {
  const userDb = buildUserIdsDb();
  const getByIds = buildGetByIds({userDb});
  const createNew = buildCreateNew({
    userDb,
    getByIds,
  });

  return {
    userDb,
    getByIds,
    createNew,
  };
};

describe('create new user', () => {
  it('creates user with same foreign ids provided', async () => {
    const property = fc.asyncProperty(
      fc.string().filter(_ => _.length > 0),
      async firebaseId => {
        const {createNew} = build();
        const created = await createNew({firebaseId});
        return R.equals(created.firebaseId, firebaseId);
      }
    );
    await fc.assert(property);
  });

  it('rejects when id collision', async () => {
    const property = fc.asyncProperty(
      fc.string().filter(_ => _.length > 0),
      async firebaseId => {
        const {createNew} = build();
        try {
          await createNew({firebaseId});
          await createNew({firebaseId});
          return false;
        } catch (error) {
          return true;
        }
      }
    );
    await fc.assert(property);
  });
});
