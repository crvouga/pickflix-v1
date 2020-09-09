import {buildListLogic} from './list-logic';
import {ListItemStorage, ListStorage} from '../storage';

export const ListLogic = buildListLogic({ListStorage, ListItemStorage});
