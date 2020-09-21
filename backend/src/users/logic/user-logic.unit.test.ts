import {EventTypes} from '../../events/events-types';
import {buildUserLogicFake} from './user-logic.fake';

const firebaseId = '1234567890';

describe('user logic', () => {
  it('get by id user else create new user', async () => {
    const {UserLogic} = buildUserLogicFake();

    const created = await UserLogic.createNew({firebaseId});
    const found = await UserLogic.getElseCreateNew({firebaseId});

    expect(found).toStrictEqual(created);
  });

  it('returns falsy when no user exists', async () => {
    const {UserLogic} = buildUserLogicFake();

    const found = await UserLogic.getById({firebaseId});

    expect(found).toBeFalsy();
  });

  it('creates new users', async () => {
    const {UserLogic} = buildUserLogicFake();

    const before = await UserLogic.getById({firebaseId});
    const created = await UserLogic.getElseCreateNew({firebaseId});
    const after = await UserLogic.getById({firebaseId});

    expect(before).toBeFalsy();
    expect(created).toStrictEqual(after);
  });

  it('emits an event when created', async done => {
    const {UserLogic, eventEmitter} = buildUserLogicFake();
    const user1 = await UserLogic.getElseCreateNew({firebaseId: '1234567890'});

    eventEmitter.on(EventTypes.USER_CREATED, user2 => {
      expect(user2).toStrictEqual(user1);
      done();
    });
    setTimeout(done, 1000);
  });
});
