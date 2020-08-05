const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
module.exports = (app) => {
  app.use(require("./cors"));
  app.use(bodyParser.json());
  app.use(cookieParser());
};
