const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

const env = process.env.NODE_ENV || "development";
const cookieOptions =
  env === "development" ? true : { secure: true, sameSite: "none" };

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(require("./cors"));

  // CSRF protection
  app.use(csurf({ cookie: cookieOptions }));
  app.use((req, res, next) => {
    // NOTE: Axios will send this back header implicitly
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
  });
};
