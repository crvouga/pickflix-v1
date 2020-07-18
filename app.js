require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

app.use("/api/tmdb", require("./api/tmdb"));
app.use("/api/youtube", require("./api/youtube"));

const buildPath = path.join(__dirname, "client", "build");
app.use(express.static(buildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`express server listening`);
  console.log(`http://localhost:${PORT}/`);
});
