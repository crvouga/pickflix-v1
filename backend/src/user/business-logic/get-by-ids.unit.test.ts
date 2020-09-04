import R from 'ramda';
import fc from 'fast-check';
import {buildUserDb} from '../data-access/user-db.fake';
import {buildCreateNew} from './create-new';
import {buildGetByIds} from './get-by-ids';

const build = () => {
  const userDb = buildUserDb();
  const getByIds = buildGetByIds({userDb});
  const createNew = buildCreateNew({getByIds, userDb});
  return {
    userDb,
    createNew,
    getByIds,
  };
};

describe('get user by some credential', () => {
  it('returns existing user', async () => {
    const property = fc.asyncProperty(
      fc.string().filter(_ => _.length > 0),
      async firebaseId => {
        const {createNew, getByIds} = build();

        const created = await createNew({firebaseId});
        const found = await getByIds({firebaseId});

        return R.equals(found, created);
      }
    );

    await fc.assert(property);
  });

  it('returns falsy when no user exists', async () => {
    const property = fc.asyncProperty(
      fc.string().filter(_ => _.length > 0),
      async firebaseId => {
        const {getByIds} = build();
        const found = await getByIds({firebaseId});
        return R.not(found);
      }
    );
    await fc.assert(property);
  });
});
