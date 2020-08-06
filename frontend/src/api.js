import axios from "axios";

const env = process.env.NODE_ENV || "development";

export const baseURL =
  env === "development"
    ? "http://192.168.7.30:5000"
    : "https://pickflix-backend.herokuapp.com";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  // CSRF protection
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN", //"CSRF-TOKEN""
});

export default api;
