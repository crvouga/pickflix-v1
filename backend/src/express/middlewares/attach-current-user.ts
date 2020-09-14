import {Handler} from 'express';

export const attachCurrentUser: Handler = async (req, res, next) => {
  const {firebaseAdmin, UserLogic} = req;
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
