import {IRouter, Handler} from 'express';
import {User} from '../models/make-user';
import {Dependencies} from './types';
import {validationResult, query, body} from 'express-validator';
const handleValidationResult: Handler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  next();
};

export const buildAuthRouter = ({userLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.get('/auth/credentials', async (req, res, next) => {
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

  router.get('/auth', middlewares.attachUser, (req, res, next) => {
    const user = req.user;
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).end();
    }
  });

  router.delete('/auth', middlewares.attachUser, (req, res) => {
    req.logout();
    if (req.session) {
      req.session.destroy(error => {});
    }
    res.json({
      message: 'You have been logged out.',
    });
  });

  router.post('/auth', middlewares.attachUser, (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Invalid username or password.',
      });
    }
    const {id, username} = req.user as User;
    res
      .status(200)
      .json({
        id,
        username,
      })
      .end();
  });
};

export const buildUsersRouter = ({userLogic}: Dependencies) => (
  router: IRouter
) => {
  router.post(
    '/users/password',
    body('username').isString(),
    body('email').isEmail(),
    body('password').isString(),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        const user = await userLogic.createUserWithPassword({
          email,
          username,
          password,
        });

        res.status(201).json(user).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
