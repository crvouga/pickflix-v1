import dotenv from "dotenv";
import path from "path";

const PATH_TO_ROOT_DIR = path.join(__dirname, "..", "..");
const PATH_TO_ENV = path.join(PATH_TO_ROOT_DIR, ".env");
const PATH_TO_FRONTEND = path.join(PATH_TO_ROOT_DIR, "frontend", "build");
const PATH_TO_STORE = path.join(__dirname, "..", "_store");
const PATH_TO_SESSION_STORE = path.join(PATH_TO_STORE, "session");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const env = process.env.NODE_ENV || "development";

if (!process.env.MONGODB_CONNECTION_URI) {
  throw { message: "MONGODB_CONNECTION_URI required" };
}

export default Object.freeze({
  env,
  //
  PORT: process.env.PORT || 5000,

  // MAKE SURE .gitignore THIS!
  // used to store session data and data access layer in dev
  PATH_TO_STORE,
  PATH_TO_SESSION_STORE,

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
  PATH_TO_FRONTEND,
});
