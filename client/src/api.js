import axios from "axios";

const baseURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:9000/"
    : "https://pickflix-backend.herokuapp.com/";

const api = axios.create({
  baseURL: baseURL,
});

export default api;
