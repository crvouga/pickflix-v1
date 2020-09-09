import {UserStorage} from '../storage';
import {buildUserLogic} from './user-logic';

export const userLogic = buildUserLogic({UserStorage});
