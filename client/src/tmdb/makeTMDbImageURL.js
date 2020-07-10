import axios from "axios";
import makeImageURL from "./_makeTMDbImageURL";

let TMDbConfiguration;
axios.get("/api/tmdb/configuration").then((res) => {
  TMDbConfiguration = res.data;
});

export default (...args) => makeImageURL(TMDbConfiguration, ...args);
