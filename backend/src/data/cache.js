const Keyv = require("keyv");
const config = require("../config");

const cache = new Keyv(config.mongoDbConnectionURI);
cache.on("error", (err) => {
  console.log("mongodb connection Error", err);
});

module.exports = cache;
