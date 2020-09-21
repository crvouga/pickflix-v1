import {buildUserStorageFake} from '../storage/user-storage.fake';
import {buildUserLogic} from './user-logic';
import {EventEmitter} from 'events';

export const buildUserLogicFake = ({
  eventEmitter = new EventEmitter(),
} = {}) => {
  const UserStorage = buildUserStorageFake();
  const UserLogic = buildUserLogic({UserStorage, eventEmitter});
  return {UserLogic, UserStorage, eventEmitter};
};
