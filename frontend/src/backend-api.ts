import axios from "axios";

const isProd = import.meta.env.PROD;

const devBackendUrl = "http://localhost:5000";

const backendUrl = isProd ? "" : devBackendUrl;

export const BackendAPI = axios.create({
  withCredentials: true,
  baseURL: backendUrl,
});
