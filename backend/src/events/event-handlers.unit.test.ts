import {EventTypes} from './events-types';
import {makeUserFake} from '../users/models/make-user.fake';
import {buildListLogicFake} from '../lists/logic/build.fake';
import {ListLogic} from '../lists/logic/build';
import {buildEventHandlersFake} from './event-handlers.fake';

describe('event handlers list', () => {
  it('creates some auto lists for new user', async () => {
    const {eventHandlers, listLogic, eventEmitter} = buildEventHandlersFake();

    const user = makeUserFake();

    const before = await listLogic.getLists({ownerId: user.id});

    await eventHandlers.onUserCreated({user});

    const after = await listLogic.getLists({ownerId: user.id});

    expect(before).toHaveLength(0);
    expect(after).toHaveLength(ListLogic.AUTO_LIST_TITLES.length);
  });
});
