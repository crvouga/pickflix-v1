const pg = require("pg");

const env = process.env.NODE_ENV || "development";

const config =
  env === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
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

const pool = new pg.Pool(config);

module.exports = pool;
