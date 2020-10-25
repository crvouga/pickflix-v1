import cookieParser from 'cookie-parser';
import cors from 'cors';
import {Application, Handler} from 'express';
import session from 'express-session';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {UserLogic} from '../logic/user-logic';
import {User, UserId} from '../models/make-user';

import makeFileStore from 'session-file-store';
import configuration from '../../configuration';
const FileStore = makeFileStore(session);

export const buildAuthMiddleware = ({userLogic}: {userLogic: UserLogic}) => (
  app: Application
) => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Set-Cookie, withCredentials'
    );
    next();
  });

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.set('trust proxy', 1);

  app.use(
    session({
      store: new FileStore({
        path: configuration.storeDirectoryName,
      }),

      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      rolling: true,

      name: 'pickflix',
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 10 * 365 * 24 * 60 * 60,
      },
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, callback) => {
        userLogic
          .verifyEmailAndPassword({
            email,
            password,
          })
          .then(user => {
            callback(null, user ? user : false);
          })
          .catch(error => {
            callback(error);
          });
      }
    )
  );

  passport.serializeUser<User, UserId>((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser<User, UserId>((id, callback) => {
    userLogic
      .getUser({id})
      .then(user => {
        callback(null, user);
      })
      .catch(error => callback(error));
  });

  app.use(passport.initialize());

  app.use(passport.session());
};

export type AuthenticateMiddleware = Handler;
export const authenticate: Handler = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error(error);
    }

    req.logIn(user, error => {
      next();
    });
  })(req, res, next);
};

export type IsAuthenticatedMiddleware = Handler;
export const isAuthenticated: IsAuthenticatedMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({message: 'User not signed in.'}).end();
  }
};
