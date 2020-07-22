require("dotenv").config();
const express = require("express");

const cors = require("./cors");

const app = express();

app.use(cors());

app.use("/api/tmdb", require("./tmdb"));
app.use("/api/youtube", require("./youtube"));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`express server listening on port ${PORT}`);
});
