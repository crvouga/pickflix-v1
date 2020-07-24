const pg = require("pg");

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new pg.Pool(config);

module.exports = pool;
