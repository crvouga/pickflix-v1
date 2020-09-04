import {makeId, isValidId} from '../../id';
import {buildMakeUser} from './user';
export const makeUser = buildMakeUser({makeId, isValidId});
