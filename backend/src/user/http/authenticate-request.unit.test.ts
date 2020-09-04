import fc from 'fast-check';
import R from 'ramda';
import {arbitraryUser} from '../business-entities/__arbitrary__/user';
import {buildAuthenticateRequest} from './authenticate-request';

const arbitraryRequest = () =>
  fc.record({
    headers: fc.record({
      authorization: fc.string().filter(_ => _.length > 0),
    }),
  });

describe('authenicate request', () => {
  it('returns a user', async () => {
    const property = fc.asyncProperty(
      arbitraryUser(),
      arbitraryRequest(),
      async (user, request) => {
        const authenicateRequest = buildAuthenticateRequest({
          getElseCreateNew: async () => user,
          authenicateFirebaseIdToken: async () => ({
            uid: user.firebaseId,
          }),
        });
        const authenicated = await authenicateRequest(request);
        return R.equals(authenicated, user);
      }
    );
    await fc.assert(property);
  });

  it('rejects if not authorization header', async () => {
    const property = fc.asyncProperty(
      arbitraryUser(),
      fc.constant({headers: {authorization: undefined}}),
      async (user, request) => {
        const authenicateRequest = buildAuthenticateRequest({
          getElseCreateNew: async () => user,
          authenicateFirebaseIdToken: async () => ({
            uid: user.firebaseId,
          }),
        });

        try {
          await authenicateRequest(request);
          return false;
        } catch (e) {
          return true;
        }
      }
    );
    await fc.assert(property);
  });

  it('rejects when authenicateFirebaseIdToken throws', async () => {
    const property = fc.asyncProperty(
      arbitraryUser(),
      arbitraryRequest(),
      async (user, request) => {
        const autenicateRequest = buildAuthenticateRequest({
          authenicateFirebaseIdToken: () => {
            throw new Error('error!');
          },
          getElseCreateNew: async () => user,
        });
        try {
          await autenicateRequest(request);
          return false;
        } catch (e) {
          return true;
        }
      }
    );
    await fc.assert(property);
  });
});
