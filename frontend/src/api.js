import axios from "axios";

const env = process.env.NODE_ENV || "development";

const baseURL =
  env === "development"
    ? "http://192.168.7.30:9000" //"http://localhost:9000"
    : "https://pickflix-backend.herokuapp.com";

const api = axios.create({
  baseURL: baseURL,
});

export default api;
