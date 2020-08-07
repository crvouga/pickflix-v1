module.exports = (app) => {
  app.use("/api/todo", require("./todo"));
  app.use("/api/tmdb", require("./tmdb"));
  app.use("/api/youtube", require("./youtube"));
};
