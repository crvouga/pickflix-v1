const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(require("./cors"));

  // CSRF protection
  app.use(csurf({ cookie: true }));
  app.use((req, res, next) => {
    // NOTE: Axios will send this back header implicitly
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
  });
};
