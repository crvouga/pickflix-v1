import {Handler} from 'express';
import {IUserLogic} from '../../../users/logic/types';

type Build = (_: {userLogic: IUserLogic; firebaseAdmin: any}) => Handler;

export const buildAttachCurrentUser: Build = ({
  firebaseAdmin,
  userLogic,
}) => async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
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
