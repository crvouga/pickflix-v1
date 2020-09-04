import fc, {Arbitrary} from 'fast-check';
import {User} from '../user';
import {makeUser} from '..';

export const arbitraryFirebaseId = () =>
  fc
    .nat()
    .filter(_ => _ > 0)
    .map(_ => _.toString());

export const arbitraryForeignIds = () =>
  fc.record({
    firebaseId: arbitraryFirebaseId(),
  });

export const arbitraryUser = (): Arbitrary<User> =>
  fc
    .record({
      id: fc.uuidV(4),
      firebaseId: arbitraryFirebaseId(),
    })
    .map(_ => makeUser(_));
