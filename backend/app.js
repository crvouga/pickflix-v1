require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const buildPath = path.join(__dirname, "..", "frontend", "build");

app.use(express.static(buildPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use("/tmdb", require("./tmdb"));
app.use("/youtube", require("./youtube"));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`express server listening on port ${PORT}`);
});
