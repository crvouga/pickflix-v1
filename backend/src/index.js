const express = require("express");
const config = require("./config");

const startServer = async () => {
  const app = express();

  await require("./loaders")({ app });

  app.listen(config.port, () => {
    console.log(
      `################################################\nServer listening on port: ${config.port}\n################################################`
    );
  });
};

startServer();
