import axios from "axios";
import Cookies from "js-cookie";
const env = process.env.NODE_ENV || "development";

export const baseURL =
  env === "development"
    ? "http://192.168.7.30:5000"
    : "https://pickflix-backend.herokuapp.com";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;
