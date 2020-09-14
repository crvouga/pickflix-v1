import {buildUserStorageFake} from '../../users/storage/user-storage.fake';
import {buildListStorageFake} from '../storage/list-storage.fake';
import {buildListLogic} from './list-logic';

export const buildListLogicFake = () => {
  const UserStorage = buildUserStorageFake();
  const ListStorage = buildListStorageFake();
  const ListLogic = buildListLogic({
    UserStorage,
    ListStorage,
  });
  return {ListLogic, ListStorage, UserStorage};
};
