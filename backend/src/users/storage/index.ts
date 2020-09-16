import {makeDb} from '../../postgres/makeDb';
import {buildUserStorage} from './user-storage';
export const UserStorage = buildUserStorage({makeDb});
