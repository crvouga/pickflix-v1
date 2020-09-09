import bodyParser from 'body-parser';
import express from 'express';
import {makeTestUser} from '../../../users/models/test';
import {ListLogic} from '../../../lists/logic/tests/build';
import {buildListRouter} from '../lists';

export const build = () => {
  const currentUser = makeTestUser();

  const attachCurrentUser: express.Handler = (req, res, next) => {
    req.currentUser = currentUser;
    next();
  };

  const router = buildListRouter({
    attachCurrentUser,
    ListLogic,
  });

  const app = express();
  app.use(bodyParser.json());
  app.use('', router);

  return {
    ListLogic,
    currentUser,
    app,
  };
};
