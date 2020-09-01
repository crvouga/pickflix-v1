const config = require("../env");

module.exports = {
  test: {
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "pickflix",
  },
  development: {
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "pickflix",
  },
  production: {
    connectionString: config.databaseURL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
