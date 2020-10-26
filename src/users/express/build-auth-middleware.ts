import makeMongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { Application, Handler } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import makeFileStore from "session-file-store";
import configuration from "../../configuration";
import { UserLogic } from "../logic/user-logic";
import { User, UserId } from "../models/make-user";

const getSessionStore = () => {
  if (configuration.env === "development" || configuration.env === "test") {
    const FileStore = makeFileStore(session);
    return new FileStore({ path: configuration.PATH_TO_SESSION_STORE });
  } else {
    const MongoStore = makeMongoStore(session);
    return new MongoStore({
      url: configuration.MONGODB_CONNECTION_URI,
      mongoOptions: {},
    });
  }
};

export const buildAuthMiddleware = ({
  userLogic,
}: {
  userLogic: UserLogic;
}) => (app: Application) => {
  app.use(cookieParser());

  app.use(
    session({
      name: "pickflix-session",
      store: getSessionStore(),
      secret: configuration.SESSION_COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: configuration.env !== "development",
        maxAge: 10 * 365 * 24 * 60 * 60, // 10 years,
      },
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, callback) => {
        userLogic
          .verifyEmailAndPassword({
            email,
            password,
          })
          .then((user) => {
            callback(null, user ? user : false);
          })
          .catch((error) => {
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
      .getUser({ id })
      .then((user) => {
        callback(null, user);
      })
      .catch((error) => callback(error));
  });

  app.use(passport.initialize());

  app.use(passport.session());
};

export type AuthenticateMiddleware = Handler;
export const authenticate: Handler = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json(info).end();
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }

      return res.status(200).json(user).end();
    });
  })(req, res, next);
};

export type IsAuthenticatedMiddleware = Handler;
export const isAuthenticated: IsAuthenticatedMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ message: "User not signed in." }).end();
  }
};
