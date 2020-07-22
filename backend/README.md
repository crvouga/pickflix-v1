# Backend
### Job
* protects API keys 
* caches Youtube API responses in fear of maxing out quota

### Endpoints
Base URL: https://pickflix-backend.herokuapp.com/.  

__GET__ /api/tmdb/_...any valid TMDb API endpoint_     
Docs: https://developers.themoviedb.org/3

__GET__ /api/youtube/_...any valid Youtube API endpoint_.    
Docs: https://developers.google.com/youtube/v3

### Deployment
Deployed to Heroku.   
https://dashboard.heroku.com/apps/pickflix-backend

How I setup continuous deployment of backend subdir to Heroku     
https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder

Heroku Build pack: https://github.com/timanovsky/subdir-heroku-buildpack.  

### Configuration of .env variables

PROJECT_PATH=backend.  
NOTE: PROJECT_PATH is for heroku to only deploy backend subdir. 


YOUTUBE_API_KEY=...   
API Key: https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=pickflix.  

TMDB_API_KEY=...   
API Key: https://www.themoviedb.org/settings/api.  

MONGODB_CONNECTION_URI=...        
Connection URI: https://cloud.mongodb.com/v2/5ebb5d21f7a74e506ce600db#clusters.  

🚨IMPORTANT NOTE ON keyv BUG🐛🚨.  
MONGODB_CONNECTION_URI must begin with "mongodb://" (and not "mongodb+srv://" for example) for the library keyv to work!   
