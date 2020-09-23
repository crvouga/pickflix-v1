import {Handler} from 'express';
import {UserLogic} from '../../logic/user-logic';

export const buildAttachCurrentUser = ({
  firebaseAdmin,
  userLogic,
}: {
  userLogic: UserLogic;
  firebaseAdmin: any;
}): Handler => async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    if (!idToken) {
      throw new Error('authorization header required');
    }
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const firebaseId = decodedToken.uid;
    const currentUser = await userLogic.getElseCreateNew({firebaseId});
    req.currentUser = currentUser;
  } catch (error) {
    req.currentUser = null;
  } finally {
    next();
  }
};
