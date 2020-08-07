module.exports = (app) => {
  app.use(require("body-parser").json());
  app.use(require("cookie-parser")());
  app.use(require("./cors"));
};
