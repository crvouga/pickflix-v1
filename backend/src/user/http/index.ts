import {getElseCreateNew} from '../business-logic/index';
import authenicateFirebaseIdToken from '../../infrastructure/firebase/authenicateFirebaseIdToken';

import buildAuthenticateRequest from './authenticate-request';

export const authenticateRequest = buildAuthenticateRequest({
  getElseCreateNew,
  authenicateFirebaseIdToken,
});
