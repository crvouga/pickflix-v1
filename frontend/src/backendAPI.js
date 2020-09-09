import axios from "axios";
import firebase from "./auth/firebase";

const env = process.env.NODE_ENV || "development";

export const backendURL =
  env === "development"
    ? "http://192.168.7.30:5000" // "http://localhost:5000"
    : "https://pickflix-backend.herokuapp.com";

const backendAPI = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

backendAPI.interceptors.request.use(async (config) => {
  const idToken = (await firebase.auth().currentUser?.getIdToken()) || false;
  if (idToken) {
    config.headers.Authorization = idToken;
  }
  return config;
});

export default backendAPI;
