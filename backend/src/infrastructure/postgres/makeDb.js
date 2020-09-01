const pg = require("pg");
const pgConfig = require("./pgConfig");

const env = process.env.NODE_ENV || "development";

const pool = new pg.Pool(pgConfig[env]);

const makeDb = async () => {
  const query = async (...args) => {
    const res = await pool.query(...args);
    return res;
  };
  return {
    query,
  };
};

module.exports = {
  makeDb,
};
