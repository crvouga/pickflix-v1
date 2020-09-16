import {buildUserStorageFake} from '../../users/storage/user-storage.fake';
import {buildListStorageFake} from '../storage/list-storage.fake';
import {buildListLogic} from './build';

export const buildListLogicFake = () => {
  const UserStorage = buildUserStorageFake();
  const ListStorage = buildListStorageFake();
  const ListLogic = buildListLogic({
    ListStorage,
  });
  return {ListLogic, ListStorage, UserStorage};
};
