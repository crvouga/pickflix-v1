import {userLogic} from '../../../users/logic';
import {firebaseAdmin} from '../../firebase-admin';
import {buildAttachCurrentUser} from './build';

export const attachCurrentUser = buildAttachCurrentUser({
  userLogic,
  firebaseAdmin,
});
