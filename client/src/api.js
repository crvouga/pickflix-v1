import axios from "axios";

const isInDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const production = "https://pickflix-backend.herokuapp.com/";
const development = "http://localhost:9000/";

const baseURL = isInDevelopment ? development : production;

export default axios.create({
  baseURL,
});
