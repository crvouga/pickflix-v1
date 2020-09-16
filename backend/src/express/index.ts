import {TMDbLogic} from '../TMDb/logic';
import {ListLogic} from '../lists/logic';
import {UserLogic} from '../users/logic';
import {buildExpressApp} from './express-app';
import {attachCurrentUser} from './middlewares/attach-current-user';

import {firebaseAdmin} from '../users/firebase-admin';

export const makeExpressApp = () => {
  const {app} = buildExpressApp({
    ListLogic,
    UserLogic,
    TMDbLogic,
    attachCurrentUser,
    firebaseAdmin,
  });

  return app;
};
