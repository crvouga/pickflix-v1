import {buildAttachCurrentUser} from './build';
import {UserLogic} from '../../../users/logic';
import {firebaseAdmin} from '../../../users/firebase-admin';

export const attachCurrentUser = buildAttachCurrentUser({
  UserLogic,
  firebaseAdmin,
});
