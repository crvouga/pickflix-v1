import {UserStorage} from '../../users/storage';
import {ListStorage} from '../storage';
import {buildListLogic} from './list-logic';

export const ListLogic = buildListLogic({
  ListStorage,
  UserStorage,
});
