import api from "../api";
import makeImageURL from "./_makeTMDbImageURL";

let TMDbConfiguration;
api.get("/api/tmdb/configuration").then((res) => {
  TMDbConfiguration = res.data;
});

export default (...args) => makeImageURL(TMDbConfiguration, ...args);
