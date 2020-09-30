import {buildListLogicFake} from '../lists/logic/build.fake';
import {makeUserFake} from '../users/models/make-user.fake';
import {buildEventEmitter} from './build';
import {EventTypes} from './types';

describe(EventTypes.USER_CREATED, () => {
  it('creates auto lists', async done => {
    const {listLogic} = buildListLogicFake();
    const eventEmitter = buildEventEmitter({listLogic});

    const before = await listLogic.getLists({isAutoCreated: true});

    const user = makeUserFake();
    eventEmitter.emit(EventTypes.USER_CREATED, {user});

    await new Promise(resolve => setTimeout(resolve, 100));

    const after = await listLogic.getLists({isAutoCreated: true});

    expect(before).toHaveLength(0);
    expect(after).not.toHaveLength(0);

    done();
  });
});
