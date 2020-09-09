import {makeDb} from '../../storage/postgres/makeDb';
import {buildUserStorage} from './user-storage';
export const UserStorage = buildUserStorage({makeDb});
