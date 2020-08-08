import axios from "axios";

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || "http://localhost";

const baseDomain = `${HOST}:${PORT}`;
const baseURL = `${baseDomain}`;

console.log(baseURL);
const httpsClient = axios.create({
  baseURL,
});

httpsClient.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // console.log(config);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpsClient.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.table(error);
  }
);

export default httpsClient;
