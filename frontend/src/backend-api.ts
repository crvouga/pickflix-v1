import axios from "axios";

const env = process.env.NODE_ENV || "development";

export const backendURL = "https://pickflix-backend.herokuapp.com";

export const BackendAPI = axios.create({
  baseURL: env === "development" ? "" : backendURL,
  withCredentials: true,
});
