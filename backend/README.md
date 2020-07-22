# Backend
### Job
* protects API key protection 
* caches Youtube API responses in fear of maxing out quota

### Endpoints
GET /api/tmdb/...any valid TMDb API endpoint

Docs: https://developers.themoviedb.org/3

GET /api/youtube/...any valid Youtube API endpoint

Docs: https://developers.google.com/youtube/v3

### Deployment
Deployed to Heroku

https://dashboard.heroku.com/apps/pickflix-backend

How to step continous deployment of the backend subdir using Heroku 

https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder

### Configuration of .env variables

This for heroku to only deploy backend subdir

PROJECT_PATH=backend

YOUTUBE_API_KEY

https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=pickflix

TMDB_API_KEY

https://www.themoviedb.org/settings/api

MONGODB_CONNECTION_URI

https://cloud.mongodb.com/v2/5ebb5d21f7a74e506ce600db#clusters

🚨IMPORTANT NOTE ON keyv BUG🐛🚨

MONGODB_CONNECTION_URI must begin with "mongodb://" (and not "mongodb+srv://" for example) for the library keyv to work!


