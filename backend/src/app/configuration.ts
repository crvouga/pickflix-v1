import dotenv from "dotenv";
import path from "path";
import { ClientConfig } from "pg";
dotenv.config();

if (!process.env.YOUTUBE_API_KEY) {
  throw "YOUTUBE_API_KEY required";
}

if (!process.env.TMDB_API_KEY) {
  throw "TMDB_API_KEY required";
}

if (!process.env.MONGODB_CONNECTION_URI) {
  throw "MONGODB_CONNECTION_URI required";
}

if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
  throw "DATABASE_URL required";
}

if (!process.env.SEND_GRID_API_KEY) {
  throw "SEND_GRID_API_KEY required";
}

if (!process.env.SECRET) {
  throw "SECRET required";
}

type NodeEnv = "test" | "development" | "production";

const castNodeEnv = (env: any): NodeEnv => {
  if (env === "development" || env === "test" || env === "production") {
    return env;
  }
  return "development";
};

const PG_CLIENT_CONFIGS: { [key in NodeEnv]: ClientConfig } = {
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
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const configuration = Object.freeze({
  //
  NODE_ENV: castNodeEnv(process.env.NODE_ENV),

  //
  PORT: process.env.PORT || "5000",

  // MAKE SURE .gitignore THIS!
  // used to store session data and data access layer in dev
  PATH_TO_FILE_STORE: path.join(__dirname, "../../_store"),

  // file path to frontend static files
  PATH_TO_FRONTEND_BUILD: path.join(__dirname, "../../../frontend/build"),

  //
  SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,

  // used for database
  // SOURCE: https://cloud.mongodb.com/v2/5ebb5d21f7a74e506ce600db#clusters.
  MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI,

  // used for database
  // used by Heroku postgres add on
  // SOURCE: https://dashboard.heroku.com/apps/pickflix-backend
  DATABASE_URL: process.env.DATABASE_URL,
  // for connecting to postgres
  PG_CLIENT_CONFIGS,

  // for movie data
  // SOURCE: https://www.themoviedb.org/settings/api.
  TMDB_API_KEY: process.env.TMDB_API_KEY,

  // for youtube data
  // SOURCE: https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=pickflix.
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,

  // for sending emails
  // SOUCRE: https://app.sendgrid.com
  SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY,

  // secret for making secrets
  SECRET: process.env.SECRET,
});

export default configuration;
