import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

const BACKEND_DEV_PORT = 5000;

export default Object.freeze({
  env,
  //
  PORT: process.env.PORT || BACKEND_DEV_PORT,

  // MAKE SURE .gitignore THIS!
  // used to store session data and data access layer in dev
  storePath: '_store',
  sessionStorePath: '_store/session',

  // use for setting cookies and CORS
  sessionCookieSecret:
    process.env.SESSION_COOKIE_SECRET || 'session cookie secret',
  clientOrigin:
    env === 'development'
      ? `https://localhost:3000`
      : 'https://pickflix.web.app',

  clientOriginWhitelist: [
    'https://localhost:3000',
    'https://192.168.7.30:3000',
    'https://pickflix.web.app',
  ],

  // for heroku deployment
  // used by heroku sub dir buildpack since I only want to deploy the backend subdir to heroku
  projectPath: process.env.PROJECT_PATH,

  // for database
  // SOURCE: https://cloud.mongodb.com/v2/5ebb5d21f7a74e506ce600db#clusters.
  mongoDbConnectionURI: process.env.MONGODB_CONNECTION_URI,

  // used for database
  // used by Heroku postgres add on
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
