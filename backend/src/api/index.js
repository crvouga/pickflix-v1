const express = require("express");
const router = express.Router();
router.use("/tmdb", require("./routes/tmdb"));
router.use("/youtube", require("./routes/youtube"));
router.use("/list", require("./routes/list"));
router.use("/todo", require("./routes/todo"));
module.exports = router;
