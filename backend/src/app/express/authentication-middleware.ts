import makeMongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { Application, Handler } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import configuration from "../configuration";
import { UserLogic } from "../../users/logic/logic";
import { User, UserId, castEmailAddress } from "../../users/models/make-user";
import makeFileStore from "session-file-store";
import { castPassword } from "../../users/models";

const getSessionStore = () => {
  switch (configuration.NODE_ENV) {
    case "production":
      const MongoStore = makeMongoStore(session);
      return new MongoStore({
        url: configuration.MONGODB_CONNECTION_URI,
        mongoOptions: {},
      });

    case "development":
      const FileStore = makeFileStore(session);
      return new FileStore({
        logFn: () => {},
        path: `${configuration.PATH_TO_FILE_STORE}/session`,
      });

    default:
      return undefined;
  }
};

const getSessionCookieConfig = () => {
  switch (configuration.NODE_ENV) {
    case "production":
      return {
        maxAge: 10 * 365 * 24 * 60 * 60, // 10 years,
        secure: true,
        path: "/",
        sameSite: "strict" as "strict",
        httpOnly: true,
      };
    default:
      return {
        maxAge: 10 * 365 * 24 * 60 * 60, // 10 years,
        path: "/",
        secure: false,
        httpOnly: true,
      };
  }
};

export const useAuthenticationMiddleware = ({
  userLogic,
}: {
  userLogic: UserLogic;
}) => (app: Application) => {
  app.set("trust proxy", 1);

  app.use(cookieParser());

  app.use(
    session({
      name: "pickflix-session",
      store: getSessionStore(),
      secret: configuration.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: getSessionCookieConfig(),
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "emailAddress",
        passwordField: "password",
      },
      async (emailAddress, password, callback) => {
        try {
          const user = await userLogic.verifyEmailAddressAndPassword({
            emailAddress: castEmailAddress(emailAddress),
            password: castPassword(password),
          });
          callback(null, user ? user : false);
        } catch (error) {
          callback(error);
        }
      }
    )
  );

  passport.serializeUser<User, UserId>((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser<User, UserId>(async (id, callback) => {
    try {
      const user = await userLogic.getUser({ id });
      callback(undefined, user);
    } catch (error) {
      //EXPLANATION: https://github.com/jaredhanson/passport/issues/6
      //@ts-ignore
      callback(undefined, false);
    }
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

      return res.status(201).json(user).end();
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
