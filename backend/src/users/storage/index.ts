import {makeDb} from '../../unit-of-work/postgres/makeDb';
import {buildUserStorage} from './user-storage';
export const UserStorage = buildUserStorage({makeDb});
