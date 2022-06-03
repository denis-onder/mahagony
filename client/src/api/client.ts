import axios from "axios";
import config from "../config";

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: config.backendUrl,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export default instance;
