const cors = require("cors");

const clientOrigin = `https://pickflix.web.app`;

const env = process.env.NODE_ENV || "development";

module.exports = cors({
  //

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
      const clientHostname = new URL(clientOrigin).hostname;
      /**  allow access if client is calling api */
      if (originHostname === clientHostname) {
        return callback(null, true);
      }
    } catch (error) {
      return callback(new Error(error));
    }

    return callback(new Error("Blocked by CORS"));
  },
});
