import {isValidId, makeId} from '../../id';
import {buildMakeUser} from './make-user';
export const makeUser = buildMakeUser({makeId, isValidId});
