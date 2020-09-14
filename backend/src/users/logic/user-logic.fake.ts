import {buildUserStorageFake} from '../storage/user-storage.fake';
import {buildUserLogic} from './user-logic';

export const buildUserLogicFake = () => {
  const UserStorage = buildUserStorageFake();
  const UserLogic = buildUserLogic({UserStorage});
  return {UserLogic, UserStorage};
};
