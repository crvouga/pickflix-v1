import makeMongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {Application, Handler} from 'express';
import session from 'express-session';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import makeFileStore from 'session-file-store';
import url from 'url';
import configuration from '../../configuration';
import {UserLogic} from '../logic/user-logic';
import {User, UserId} from '../models/make-user';

const FileStore = makeFileStore(session);
const MongoStore = makeMongoStore(session);
const sessionStore = new MongoStore({
  url: configuration.mongoDbConnectionURI,
  mongoOptions: {},
});

const isEqualHostName = (url1: string, url2: string) =>
  url.parse(url1).hostname === url.parse(url2).hostname;

export const buildAuthMiddleware = ({userLogic}: {userLogic: UserLogic}) => (
  app: Application
) => {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (origin === undefined) {
          return callback(null, true);
        }

        const found = configuration.clientOriginWhitelist.find(clientOrigin =>
          isEqualHostName(clientOrigin, origin)
        );

        if (found) {
          return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
      },

      credentials: true,

      allowedHeaders: [
        'Set-Cookie',
        'withCredentials',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Authorization',
      ],

      methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],

      preflightContinue: true,
    })
  );

  app.use(cookieParser());

  app.use(
    session({
      store: sessionStore,
      secret: configuration.sessionCookieSecret,
      resave: true,
      saveUninitialized: true,
      rolling: true,

      name: 'pickflix-session',

      cookie: {
        httpOnly: true,
        path: '/',
        maxAge: 10 * 365 * 24 * 60 * 60, // 10 years,
        secure: true,
        sameSite: 'none',
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
      return res.status(401).json(info).end();
    }
    req.logIn(user, error => {
      if (error) {
        return res.status(401).json(info).end();
      }
      return next();
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
