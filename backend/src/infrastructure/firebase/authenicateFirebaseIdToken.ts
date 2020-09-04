import admin from 'firebase-admin';
import env from '../configuration';

admin.initializeApp({
  credential: admin.credential.cert(env.firebaseAdminServiceAccountKeyJSON),
  databaseURL: 'https://pickflix.firebaseio.com',
});

export default async (idToken: string) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const firebaseId = decodedToken.uid;
  const firebaseUser = await admin.auth().getUser(firebaseId);
  return firebaseUser;
};
