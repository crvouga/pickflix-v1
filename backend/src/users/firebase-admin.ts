import firebaseAdmin from 'firebase-admin';
import env from '../configuration';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    env.firebaseAdminServiceAccountKeyJSON
  ),
  databaseURL: 'https://pickflix.firebaseio.com',
});

export {firebaseAdmin};
