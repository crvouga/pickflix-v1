import {Handler, Request} from 'express';
import admin from '../../../users/firebase-admin';
import {userLogic} from '../../../users/logic';

export const attachCurrentUser: Handler = async (req: Request, res, next) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).end();
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);

  const firebaseId = decodedToken.uid;

  const currentUser = await userLogic.getElseCreateNew({firebaseId});

  req.currentUser = currentUser;

  next();
};
