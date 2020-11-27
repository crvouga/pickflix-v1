import csrf from "csurf";
import { Application } from "express";
import configuration from "../configuration";
import { ExpressAppDependencies } from "./types";

const getCSRFCookieConfig = () => {
  switch (configuration.NODE_ENV) {
    case "production":
      return {
        secure: true,
        path: "/",
        sameSite: "strict" as "strict",
        httpOnly: true,
      };
    default:
      return {
        path: "/",
        secure: false,
        sameSite: "strict" as "strict",
        httpOnly: true,
      };
  }
};

export const useSecurityMiddleware = (dependencies: ExpressAppDependencies) => (
  app: Application
) => {
  app.set("trust proxy", 1);

  if (configuration.NODE_ENV !== "test") {
    app.use(
      csrf({
        cookie: getCSRFCookieConfig(),
      })
    );

    app.use((req, res, next) => {
      res.cookie("XSRF-TOKEN", req.csrfToken());
      next();
    });
  }
};
