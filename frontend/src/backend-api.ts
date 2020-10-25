import axios from "axios";

const env = process.env.NODE_ENV || "development";

export const backendURL =
  env === "development"
    ? "http://192.168.7.30:5000" // "http://localhost:5000"
    : "https://pickflix-backend.herokuapp.com";

export const BackendAPI = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});
