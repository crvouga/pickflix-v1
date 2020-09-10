import {buildListLogic} from './logic';
import {ListItemStorage, ListStorage} from '../storage';

export const ListLogic = buildListLogic({ListStorage, ListItemStorage});
