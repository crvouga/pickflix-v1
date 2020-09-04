import {makeUser} from '.';
import {makeId} from '../../id';

describe('making user entity', () => {
  it('must have a firebase id', async () => {
    expect(() => makeUser({firebaseId: undefined})).toThrow();
  });

  it('must have a valid id', async () => {
    expect(() => makeUser({id: 'invalid id'})).toThrow();
  });

  it('uses provided id', async () => {
    const id = makeId();
    expect(makeUser({id, firebaseId: '1234567890'}).id).toBe(id);
  });

  it('creates new id if not provided', async () => {
    expect(makeUser({firebaseId: '1234567890'}).id).toBeTruthy();
  });
});
