require("dotenv").config();
const express = require("express");
const app = express();

const db = require("./db");

app.use(require("./middleware/cors")());

app.use("/api/tmdb", require("./routes/tmdb"));
app.use("/api/youtube", require("./routes/youtube"));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`express server listening on port ${PORT}`);
});
