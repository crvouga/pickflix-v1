import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

if (!process.env.MONGODB_CONNECTION_URI) {
  throw new Error('MONGODB_CONNECTION_URI required');
}

export default Object.freeze({
  env,
  //
  PORT: process.env.PORT || 5000,

  // MAKE SURE .gitignore THIS!
  // used to store session data and data access layer in dev
  storePath: '_store',
  sessionStorePath: '_store/session',

  sessionCookieSecret:
    process.env.SESSION_COOKIE_SECRET || 'session cookie secret',

  //used for CORS
  clientOriginWhitelist: [
    'https://localhost:3000',
    'https://192.168.7.30:3000',
    'https://pickflix.web.app',
  ],

  // used by heroku sub dir buildpack since I only want to deploy the /backend subdir to heroku
  // SOURCE: https://github.com/timanovsky/subdir-heroku-buildpack
  projectPath: process.env.PROJECT_PATH,

  // used for database
  // SOURCE: https://cloud.mongodb.com/v2/5ebb5d21f7a74e506ce600db#clusters.
  mongoDbConnectionURI: process.env.MONGODB_CONNECTION_URI,

  // used for database
  // used by Heroku postgres add on
  // SOURCE: https://dashboard.heroku.com/apps/pickflix-backend
  databaseURL: process.env.DATABASE_URL,

  // for movie data
  // SOURCE: https://www.themoviedb.org/settings/api.
  TMDbAPIKey: process.env.TMDB_API_KEY,

  // for youtube data
  // SOURCE: https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=pickflix.
  youtubeAPIKey: process.env.YOUTUBE_API_KEY,

  // for authentication with firebase admin
  // SOURCE: https://console.firebase.google.com/project/pickflix/settings/serviceaccounts/adminsdk
  firebaseAdminServiceAccountKeyJSON: JSON.parse(
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY_JSON || ''
  ),
});
