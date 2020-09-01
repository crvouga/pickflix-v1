const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("../env");
const cors = require("./cors");
const adpat = require("./adpater");

const { todo } = require("../../todo-list/http");

const tmdbRouter = require("./tmdb");
const youtubeRouter = require("./youtube");

const startServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.all("/api/todo", adpat(todo));
  app.use("/api/tmdb", tmdbRouter);
  app.use("/api/youtube", youtubeRouter);

  app.listen(PORT, () => {
    console.log(
      "################################################\n" +
        `Server listening on port: ${PORT}\n` +
        "################################################"
    );
  });
};

module.exports = startServer;
