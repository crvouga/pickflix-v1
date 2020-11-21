import pg from "pg";
import config from "../../../app/configuration";
import configuration from "../../../app/configuration";

export default (
  NODE_ENV?: "test" | "production" | "development"
): pg.ClientConfig => {
  switch (NODE_ENV || configuration.NODE_ENV) {
    case "test":
      return {
        user: "postgres",
        host: "localhost",
        port: 5432,
        database: "pickflix_test",
      };
    case "production":
      return {
        connectionString: config.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    default:
      return {
        user: "postgres",
        host: "localhost",
        port: 5432,
        database: "pickflix_development",
      };
  }
};
