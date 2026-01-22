import cors from "cors";
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
  // Allow HTTP for localhost/127.0.0.1 in preview/development environments
  const isLocalhost = req.hostname === 'localhost' || req.hostname === '127.0.0.1' || req.hostname === '0.0.0.0';
  if (isLocalhost) {
    return next();
  }
  res.redirect("https://" + req.hostname + req.url);
};

export const useSecurityMiddleware =
  (dependencies: ExpressAppDependencies) => (app: Application) => {
    app.set("trust proxy", 1);

    app.use(
      cors({
        credentials: true,
        origin(requestOrigin, callback) {
          return callback(null, requestOrigin);
        },
      })
    );

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
