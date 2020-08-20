const R = require("ramda");
const config = require("../config");
const env = process.env.NODE_ENV || "development";
const mung = require("express-mung");

const corsConfig = {
  credentials: true,
  origin: (origin, callback) => {
    /** allow access if in dev env */
    if (env === "development") {
      return callback(null, true);
    }

    /** Assuming an undefined origin is from a browser then allow access if origin is from a browser */
    if (origin === undefined) {
      return callback(null, true);
    }

    try {
      const originHostname = new URL(origin || "").hostname;
      const clientHostname = new URL(config.clientOrigin).hostname;
      /**  allow access if client is calling api */
      if (originHostname === clientHostname) {
        return callback(null, true);
      }
    } catch (error) {
      return callback(new Error(error));
    }

    return callback(new Error("Blocked by CORS"));
  },
};

const omitDeep = R.curry((props, object) =>
  R.when(R.is(Object), R.pipe(R.omit(props), R.map(omitDeep(props))), object)
);

module.exports = async ({ app }) => {
  // middlewares
  app.use(require("cors")(corsConfig));
  app.use(require("body-parser").json());
  app.use(require("cookie-parser")());
  app.use(require("./blacklist"));

  // api layer
  app.use("/api", require("../api"));

  // errors
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
