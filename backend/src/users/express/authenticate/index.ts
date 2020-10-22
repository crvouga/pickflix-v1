import {firebaseAdmin} from '../../firebase-admin';
import {userLogic} from '../../logic';
import {buildAttachCurrenUser, buildAuthenticate} from './build';

const dependencies = {
  userLogic,
  firebaseAdmin,
};
export const authenticate = buildAuthenticate(dependencies);
export const attachCurrentUser = buildAttachCurrenUser(dependencies);
