import csrf from "csurf";
import { Application, Handler } from "express";

import { ExpressAppDependencies } from "./types";
import { getNodeEnv } from "../../config";

const getCSRFCookieConfig = () => {
  switch (getNodeEnv()) {
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

const ensureHttps: Handler = (req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect("https://" + req.hostname + req.url);
};

export const useSecurityMiddleware = (dependencies: ExpressAppDependencies) => (
  app: Application
) => {
  app.set("trust proxy", 1);

  if (getNodeEnv() === "production") {
    app.use(
      csrf({
        cookie: getCSRFCookieConfig(),
      })
    );

    app.use((req, res, next) => {
      res.cookie("XSRF-TOKEN", req.csrfToken());
      next();
    });

    app.use(ensureHttps);
  }
};
