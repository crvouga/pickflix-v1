import {Handler} from 'express';
import {UserLogic} from '../../../users/logic/types';

type Build = (_: {UserLogic: UserLogic; firebaseAdmin: any}) => Handler;

export const buildAttachCurrentUser: Build = ({
  firebaseAdmin,
  UserLogic,
}) => async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const firebaseId = decodedToken.uid;
    const currentUser = await UserLogic.getElseCreateNew({firebaseId});
    req.currentUser = currentUser;
  } catch (error) {
    req.currentUser = null;
  } finally {
    next();
  }
};
