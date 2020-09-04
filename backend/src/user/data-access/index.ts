import {makeDb} from '../../infrastructure/postgres/makeDb';
import {buildUserDb} from './user-db';
export const userDb = buildUserDb({makeDb});
