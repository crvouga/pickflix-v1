import {ListStorage} from '../storage';
import {buildListLogic} from './build';

export const ListLogic = buildListLogic({
  ListStorage,
});
