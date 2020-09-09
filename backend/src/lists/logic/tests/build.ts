import {ListItemStorage, ListStorage} from '../../storage/test';
import {buildListLogic} from '../list-logic';

export const ListLogic = buildListLogic({ListStorage, ListItemStorage});
