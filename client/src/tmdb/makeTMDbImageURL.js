import { curry } from "ramda";
import axios from "axios";
import _makeTMDbImageURL from "./_makeTMDbImageURL";

let TMDbConfiguration;
axios.get("/api/tmdb/configuration").then((res) => {
  TMDbConfiguration = res.data;
});

export default (...args) => _makeTMDbImageURL(TMDbConfiguration, ...args);
