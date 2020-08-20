module.exports = async ({ app }) => {
  // middlewares
  app.use(require("./cors"));
  app.use(require("body-parser").json());
  app.use(require("cookie-parser")());
  app.use(require("./redact"));

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
