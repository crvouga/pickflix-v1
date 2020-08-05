# Backend

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

### For configuration of .env variable see .env.documentation
🚨IMPORTANT NOTE ON keyv BUG🐛🚨.  
MONGODB_CONNECTION_URI must begin with "mongodb://" (and not "mongodb+srv://" for example) for the library keyv to work!   

### Authentication Flow
- authenticate on client with firebase.  
- client POST to sign in endpoint with a firebase user idToken.   
- use firebase admin manage cookie session.   
🚨IMPORTANT NOTE ON chrome web browser cookie BUG🐛🚨.     
chrome for whatever reason doesn't set cookies when using localhost so when developing in chrome use the local network (like http://192.168.7.30) instead and make sure the local network is white listed for firebase authentication (https://console.firebase.google.com/project/pickflix/authentication/providers).    

CSRF protection is handle by the csurf library. NOTE: "XSRF-TOKEN" is attached to every response is sent back in the request by Axios implicitly.
