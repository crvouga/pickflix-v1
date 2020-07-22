const cors = require("cors");

const clientOrigin = `https://pickflix.web.app/`;

const env = process.env.NODE_ENV || "development";

module.exports = () =>
  cors({
    origin: (origin, callback) => {
      /** allow access if in dev mode */
      console.log({ env });
      if (env === "development") {
        return callback(null, true);
      }

      console.log({ origin, clientOrigin });
      /**  allow access if client is calling api */
      const originHostname = new URL(origin).hostname;
      const clientHostname = new URL(clientOrigin).hostname;
      console.log({ originHostname, clientHostname });

      if (originHostname === clientHostname) {
        return callback(null, true);
      }
      return callback(new Error("Blocked by CORS"));
    },
  });
