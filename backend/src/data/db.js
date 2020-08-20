const pg = require("pg");
const { camelizeKeys } = require("humps");
const config = require("../config");
const env = process.env.NODE_ENV || "development";

const databaseConfig =
  env === "production"
    ? {
        connectionString: config.databaseURL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : env === "development"
    ? {
        user: "postgres",
        host: "localhost",
        port: 5432,
        database: "pickflix",
      }
    : {};

const pool = new pg.Pool(databaseConfig);

const query = async (text, params) => {
  const res = await pool.query(text, params);
  return camelizeKeys(res);
};

module.exports = {
  query,
};
