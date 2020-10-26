import pg from "pg";
import config from "../../configuration";

const pgClientConfigs: Record<string, pg.ClientConfig> = {
  test: {
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "pickflix_test",
  },
  development: {
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "pickflix_development",
  },
  production: {
    connectionString: config.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export default pgClientConfigs;
