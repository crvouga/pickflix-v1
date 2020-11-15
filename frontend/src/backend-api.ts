import axios from "axios";

export const BackendAPI = axios.create({
  withCredentials: true,
});
