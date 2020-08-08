import axios from "axios";

const baseDomain = "http://127.0.0.1:8000";
const baseURL = `${baseDomain}`;

const httpsClient = axios.create({
  baseURL,
});

export default httpsClient;
