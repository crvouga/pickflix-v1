require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const clientOrigin = `https://pickflix.web.app/`;

const corsOptions = (origin, callback) => {
  // allow access if in dev mode
  if (process.env.NODE_ENV === "development") {
    return callback(null, true);
  }

  // allow access if client is calling api
  const originHostname = new URL(origin).hostname;
  const clientHostname = new URL(clientOrigin).hostname;

  if (originHostname === clientHostname) {
    return callback(null, true);
  }
  return callback(new Error("Blocked by CORS"));
};

app.use(
  cors({
    options: corsOptions,
  })
);

app.use("/api/tmdb", require("./tmdb"));
app.use("/api/youtube", require("./youtube"));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`express server listening on port ${PORT}`);
});
