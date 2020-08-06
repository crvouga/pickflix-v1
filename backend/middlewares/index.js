const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

const env = process.env.NODE_ENV || "development";
const _csurfCookieOptions =
  env === "development" ? {} : { secure: true, sameSite: "none" };

const XSRF_TOKEN_cookieOptions =
  env === "development"
    ? {}
    : {
        secure: true,
        sameSite: "none",
        httpOnly: false /* so client can send it back in body */,
      };

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(require("./cors"));

  // CSRF protection
  app.use(csurf({ cookie: _csurfCookieOptions }));
  app.use((req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken(), XSRF_TOKEN_cookieOptions);
    next();
  });
};
