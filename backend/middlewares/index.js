const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

module.exports = (app) => {
  app.use(require("./cors"));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(csurf({ cookie: true }));
  app.use((req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
  });
};
