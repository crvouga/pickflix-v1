import {EventEmitter} from 'events';
import {EventTypes} from '../../events/types';
import {buildUserLogicFake} from './user-logic.fake';
import {makeUserFake} from '../models/make-user.fake';

const {firebaseId} = makeUserFake();

describe('user logic', () => {
  it('get by id user else create new user', async () => {
    const {userLogic} = buildUserLogicFake();

    const created = await userLogic.createNew({firebaseId});
    expect(userLogic.getElseCreateNew({firebaseId})).resolves.toStrictEqual(
      created
    );
  });

  it('returns falsy when no user exists', async () => {
    const {userLogic} = buildUserLogicFake();

    expect(userLogic.getById({firebaseId})).resolves.toBeFalsy();
  });

  it('creates new users', async () => {
    const {userLogic} = buildUserLogicFake();

    const before = await userLogic.getById({firebaseId});
    const created = await userLogic.getElseCreateNew({firebaseId});

    expect(before).toBeFalsy();
    expect(userLogic.getById({firebaseId})).resolves.toStrictEqual(created);
  });

  it('emits an event when created', async done => {
    const emitMock = jest.fn();

    const {userLogic} = buildUserLogicFake({
      eventEmitter: {
        ...new EventEmitter(),
        emit: emitMock,
      },
    });

    const user = await userLogic.getElseCreateNew({firebaseId});
    expect(emitMock.mock.calls[0][0]).toStrictEqual(EventTypes.USER_CREATED);
    expect(emitMock.mock.calls[0][1]).toStrictEqual({user});
    done();
  });
});
