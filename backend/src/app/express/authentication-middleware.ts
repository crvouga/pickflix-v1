import { Application, Handler } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserLogic } from "../../users/logic/logic";
import { castPassword } from "../../users/models";
import { castEmailAddress, User, UserId } from "../../users/models/make-user";

export const useAuthenticationMiddleware =
  ({ userLogic }: { userLogic: UserLogic }) =>
  (app: Application) => {
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

    passport.serializeUser((user: User, callback) => {
      callback(null, user.id);
    });

    passport.deserializeUser(async (id: UserId, callback) => {
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
