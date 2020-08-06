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

const names = ["csrf-token", "xsrf-token", "x-csrf-token", "x-xsrf-token"];
const allNames = [].concat(
  names.map((name) => name.toLowerCase()),
  names.map((name) => name.toUpperCase())
);
const requestToTokenValue = (req) => {
  const values = [].concat(
    [req.body._csrf || false, req.query._csrf || false],
    allNames.map((name) => req.headers[name] || false),
    allNames.map((name) => req.cookies[name] || false)
  );
  const value = values.find((value) => value);
  return value;
};

module.exports = (app) => {
  app.use(
    csurf({
      value: requestToTokenValue,
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
