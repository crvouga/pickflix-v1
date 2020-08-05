require("dotenv").config();

const app = require("express")();
require("./middlewares")(app);
require("./routes")(app);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`express server listening on port ${PORT}`);
});
