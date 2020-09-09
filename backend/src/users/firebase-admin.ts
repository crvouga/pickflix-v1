import admin from 'firebase-admin';
import env from '../configuration';

admin.initializeApp({
  credential: admin.credential.cert(env.firebaseAdminServiceAccountKeyJSON),
  databaseURL: 'https://pickflix.firebaseio.com',
});

export default admin;
