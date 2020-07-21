import axios from "axios";

const isInDevMode =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const production = "https://pickflix-backend.herokuapp.com/";
const development = "http://localhost:9000/";

const baseURL = isInDevMode ? development : production;

export default axios.create({
  baseURL: baseURL,
});
