import {Handler} from 'express';
import {UserLogic} from '../../logic/user-logic';

export type AttachCurrentUserMiddleware = Handler;
export const buildAttachCurrenUser = ({
  firebaseAdmin,
  userLogic,
}: {
  userLogic: UserLogic;
  firebaseAdmin: any;
}): AttachCurrentUserMiddleware => async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

    const firebaseId = decodedToken.uid;

    const currentUser = await userLogic.getById({firebaseId});

    req.currentUser = currentUser;
  } catch (error) {
  } finally {
    next();
  }
};

export type AuthenticateMiddleware = Handler;
export const buildAuthenticate = ({
  userLogic,
  firebaseAdmin,
}: {
  userLogic: UserLogic;
  firebaseAdmin: any;
}): AuthenticateMiddleware => async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    if (!idToken) {
      throw new Error('authorization header required');
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

    const firebaseId = decodedToken.uid;

    const currentUser = await userLogic.getElseCreateNew({firebaseId});

    req.currentUser = currentUser;

    next();
  } catch (error) {
    res.status(401).json({message: 'authorization header required'}).end();
  }
};
