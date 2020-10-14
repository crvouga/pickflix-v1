import {EventEmitter} from 'events';
import {ListLogic} from '../lists/logic/build';
import {EventTypes} from './types';
import {User} from '../users/models/types';

export const buildEventEmitter = ({listLogic}: {listLogic: ListLogic}) => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on(EventTypes.USER_CREATED, async ({user}: {user: User}) => {
    await listLogic.addInitialAutoLists({user});
  });

  return eventEmitter;
};
