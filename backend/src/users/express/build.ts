import {IRouter} from 'express';
import {Dependencies} from './types';

export const buildAuthRouter = ({userLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.get('/auth', middlewares.isAuthenticated, (req, res, next) => {
    res.status(200).json(req.user);
  });

  router.delete('/auth', (req, res) => {
    req.logout();
    if (req.session) {
      req.session.destroy(error => {});
    }
    res.status(204).end();
  });

  router.post('/auth', middlewares.authenticate, (req, res) => {
    res.status(201).json(req.user).end();
  });

  router.get('/auth/methods', async (req, res, next) => {
    try {
      const email = req.query.email as string;
      const credentialTypes = await userLogic.getCredentialTypesForEmail({
        email,
      });
      res.status(200).json(credentialTypes);
    } catch (error) {
      next(error);
    }
  });
};

export const buildUsersRouter = ({userLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.get(
    '/users/current',
    middlewares.isAuthenticated,
    async (req, res, next) => {
      res.status(200).json(req.user);
    }
  );

  router.post('/users/password', async (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const displayName = req.body.displayName;
    const password = req.body.password;
    try {
      const user = await userLogic.createUserWithPassword({
        email,
        displayName,
        username,
        password,
      });

      req.logIn(user, error => {
        if (error) {
          next(error);
        } else {
          res.status(201).json(user).end();
        }
      });
    } catch (error) {
      next(error);
    }
  });
};
