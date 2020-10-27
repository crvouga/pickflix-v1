import dotenv from "dotenv";
import path from "path";
const PATH_TO_ROOT_DIR = path.join(__dirname, "..", "..");

const NODE_ENV = (process.env.NODE_ENV || "development") as
  | "test"
  | "production"
  | "development";

if (
  NODE_ENV !== "test" &&
  NODE_ENV !== "production" &&
  NODE_ENV !== "development"
) {
  console.error({ NODE_ENV });
  throw `invalid NODE_ENV`;
}

const result = dotenv.config({
  path: path.join(PATH_TO_ROOT_DIR, ".env"),
});

if (result.error) {
  throw result.error;
}

if (!process.env.YOUTUBE_API_KEY) {
  throw "env.YOUTUBE_API_KEY required";
}

if (!process.env.TMDB_API_KEY) {
  throw "env.TMDB_API_KEY required";
}

if (!process.env.MONGODB_CONNECTION_URI) {
  throw "env.MONGODB_CONNECTION_URI required";
}

if (NODE_ENV === "production" && !process.env.DATABASE_URL) {
  throw "env.DATABASE_URL required";
}

export default Object.freeze({
  NODE_ENV,
  //
  PORT: Number(process.env.PORT || 5000),

  // MAKE SURE .gitignore THIS!
  // used to store session data and data access layer in dev
  PATH_TO_FILE_STORE: path.join(PATH_TO_ROOT_DIR, "..", "_store"),

  SESSION_COOKIE_SECRET:
    process.env.SESSION_COOKIE_SECRET || "session cookie secret",

  // used for database
  // SOURCE: https://cloud.mongodb.com/v2/5ebb5d21f7a74e506ce600db#clusters.
  MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI,

  // used for database
  // used by Heroku postgres add on
  // SOURCE: https://dashboard.heroku.com/apps/pickflix-backend
  DATABASE_URL: process.env.DATABASE_URL,

  // for movie data
  // SOURCE: https://www.themoviedb.org/settings/api.
  TMDB_API_KEY: process.env.TMDB_API_KEY,

  // for youtube data
  // SOURCE: https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=pickflix.
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,

  // file path to frontend static files
  PATH_TO_FRONTEND: path.join(PATH_TO_ROOT_DIR, "frontend", "build"),
});
