import cookieParser from 'cookie-parser';
import {Application} from 'express';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import {UserLogic} from '../logic/user-logic';
import {User, UserId} from '../models/make-user';

export const buildPassport = ({userLogic}: {userLogic: UserLogic}) => (
  app: Application
) => {
  app.use(cookieParser());

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      name: 'sid',
      cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000,
      },
    })
  );

  passport.use(
    new passportLocal.Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, callback) => {
        try {
          const user = await userLogic.verifyUsernameAndPassword({
            username,
            password,
          });
          callback(null, user);
        } catch (error) {
          callback(error);
        }
      }
    )
  );

  passport.serializeUser<User, UserId>(async (user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser<User, UserId>(async (id, callback) => {
    try {
      const user = await userLogic.getUser({id});
      callback(null, user);
    } catch (error) {
      callback(error);
    }
  });

  app.use(passport.initialize());

  app.use(passport.session());
};
