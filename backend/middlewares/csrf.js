const csurf = require("csurf");

const env = process.env.NODE_ENV || "development";
const _csurfCookieOptions =
  env === "development"
    ? {}
    : { secure: true, sameSite: "none", httpOnly: true };

const XSRF_TOKEN_cookieOptions =
  env === "development"
    ? {}
    : {
        secure: true,
        sameSite: "none",
        httpOnly: false /* so client can send it back in body */,
      };

module.exports = (app) => {
  app.use(
    csurf({
      value: (req) => req.cookies["XSRF-TOKEN"],
      cookie: _csurfCookieOptions,
    })
  );
  app.use((req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken(), XSRF_TOKEN_cookieOptions);
    next();
  });
  app.use((err, req, res, next) => {
    if (err.code !== "EBADCSRFTOKEN") return next(err);
    // handle CSRF token errors here
    res.status(403);
    res.send("form tampered with");
  });
};
