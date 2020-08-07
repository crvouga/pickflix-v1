import backendAPI from "../backendAPI";
import makeImageURL from "./_makeTMDbImageURL";

let TMDbConfiguration;
backendAPI.get("/api/tmdb/configuration").then(
  (res) => {
    TMDbConfiguration = res.data;
  },
  {
    staleTime: Infinity,
  }
);

export default (...args) => makeImageURL(TMDbConfiguration, ...args);
