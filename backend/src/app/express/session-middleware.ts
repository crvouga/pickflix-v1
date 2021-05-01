import cookieParser from "cookie-parser";
import { Application } from "express";
import session from "express-session";
import { getNodeEnv, secrets } from "../../config";

const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_MONTH = ONE_DAY * 30;

export const useSessionMiddleware = () => async (app: Application) => {
  app.use(cookieParser());

  const sessionOptions: session.SessionOptions = {
    ...session,
    name: "pickflix-session",
    secret: secrets.secret,
    resave: false,
    saveUninitialized: true,
    cookie:
      getNodeEnv() === "production"
        ? {
            secure: true,
            path: "/",
            sameSite: "strict" as "strict",
            httpOnly: true,
            maxAge: ONE_MONTH,
          }
        : {
            path: "/",
            secure: false,
            httpOnly: true,
            maxAge: ONE_MONTH,
          },
  };

  app.use(session(sessionOptions));
};
