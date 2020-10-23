import {EventEmitter} from 'events';
import {EventTypes} from '../../events/types';
import {makeUserFake} from '../models/make-user.fake';
import {buildUserLogicFake} from './user-logic.fake';

describe('user logic', () => {
  it('creates and gets user', async () => {
    const {userLogic} = buildUserLogicFake();
    const created = await userLogic.createUserWithPassword({
      email: 'crvouga@gmail.com',
      username: 'crvouga',
      password: 'password',
    });
    const got = await userLogic.getUser({id: created.id});
    expect(created).toStrictEqual(got);
  });

  it('verifies username and password', async () => {
    const {userLogic} = buildUserLogicFake();

    const created = await userLogic.createUserWithPassword({
      email: 'crvouga@gmail.com',
      username: 'crvouga',
      password: 'password',
    });

    const verified = await userLogic.verifyUsernameAndPassword({
      username: 'crvouga',
      password: 'password',
    });
    expect(created).toStrictEqual(verified);
  });
  it('emits an event when created', async done => {
    const emitMock = jest.fn();

    const {userLogic} = buildUserLogicFake({
      eventEmitter: {
        ...new EventEmitter(),
        emit: emitMock,
      },
    });
    const {username, email} = makeUserFake();
    const user = await userLogic.createUserWithPassword({
      username,
      email,
      password: 'password',
    });
    expect(emitMock.mock.calls[0][0]).toStrictEqual(EventTypes.USER_CREATED);
    expect(emitMock.mock.calls[0][1]).toStrictEqual({user});
    done();
  });
});
