import {buildAttachCurrentUser} from './build';
import {userLogic} from '../../../users/logic';
import {firebaseAdmin} from '../../../users/firebase-admin';

export const attachCurrentUser = buildAttachCurrentUser({
  userLogic,
  firebaseAdmin,
});
