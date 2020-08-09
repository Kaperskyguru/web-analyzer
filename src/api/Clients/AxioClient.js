import axios from "axios";
const production = window.location.origin;
const development = "http://localhost:9000";
const url = process.env.NODE_ENV == "production" ? production : development;

const baseURL = `${url}`;

const httpsClient = axios.create({
  baseURL,
});

export default httpsClient;
