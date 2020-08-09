import axios from "axios";

// const PORT = process.env.PORT || 9000;
// const HOST = process.env.HOST || "http://localhost";

// const production = window.location.origin;
// const development = "http://localhost:9000";
// const url = process.env.NODE_ENV == "production" ? production : development;

// console.log(process.env.NODE_ENV, url);
// const baseURL = `${url}`;

const httpsClient = axios.create();

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
