const Keyv = require("keyv");
const config = require("../env");
const keyv = new Keyv(config.mongoDbConnectionURI);
keyv.on("error", (err) => {
  console.log("mongodb connection Error", err);
});

module.exports = keyv;
