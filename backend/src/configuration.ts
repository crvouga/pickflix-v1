import dotenv from 'dotenv';
dotenv.config();

export default {
  // for dev env
  // make sure .gitignore this!
  storeDirectoryName: 'store',
  //
  PORT: process.env.PORT || 5000,
  // CORS
  clientOrigin: 'https://pickflix.web.app',
  clientDomain: 'pickflix.web.app',
  // used by heroku sub dir buildpack since I only want to deploy the backend subdir to heroku
  projectPath: process.env.PROJECT_PATH,
  // used for database
  // Source: https://cloud.mongodb.com/v2/5ebb5d21f7a74e506ce600db#clusters.
  mongoDbConnectionURI: process.env.MONGODB_CONNECTION_URI,

  // used for database
  // Used by Heroku postgres add on
  databaseURL: process.env.DATABASE_URL,

  // for movie data
  // Source: https://www.themoviedb.org/settings/api.
  TMDbAPIKey: process.env.TMDB_API_KEY,

  // for youtube data
  // Source: https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=pickflix.
  youtubeAPIKey: process.env.YOUTUBE_API_KEY,

  // for authentication with firebase admin
  // Source: https://console.firebase.google.com/project/pickflix/settings/serviceaccounts/adminsdk
  firebaseAdminServiceAccountKeyJSON: JSON.parse(
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY_JSON || ''
  ),
};
