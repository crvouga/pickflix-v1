import {EventEmitter} from 'events';
import {EventTypes} from '../../events/events-types';
import {buildUserLogicFake} from './user-logic.fake';
import {User} from '../models/types';

const firebaseId = '1234567890';

describe('user logic', () => {
  it('get by id user else create new user', async () => {
    const {userLogic} = buildUserLogicFake();

    const created = await userLogic.createNew({firebaseId});
    const found = await userLogic.getElseCreateNew({firebaseId});

    expect(found).toStrictEqual(created);
  });

  it('returns falsy when no user exists', async () => {
    const {userLogic} = buildUserLogicFake();

    const found = await userLogic.getById({firebaseId});

    expect(found).toBeFalsy();
  });

  it('creates new users', async () => {
    const {userLogic} = buildUserLogicFake();

    const before = await userLogic.getById({firebaseId});
    const created = await userLogic.getElseCreateNew({firebaseId});
    const after = await userLogic.getById({firebaseId});

    expect(before).toBeFalsy();
    expect(created).toStrictEqual(after);
  });

  it('emits an event when created', async done => {
    const emitMock = jest.fn();

    const {userLogic} = buildUserLogicFake({
      eventEmitter: {
        ...new EventEmitter(),
        emit: emitMock,
      },
    });

    const user = await userLogic.getElseCreateNew({firebaseId: '1234567890'});
    expect(emitMock.mock.calls[0][0]).toStrictEqual(EventTypes.USER_CREATED);
    expect(emitMock.mock.calls[0][1]).toStrictEqual({user});
    done();
  });
});
