import Http from "./Clients/AxioClient";
const resource = "/ping";

export default {
  async pingServer(url) {
    console.log(`${resource}/?url=${url}`);
    return await Http.get(`${resource}/?url=${url}`);
  },
};
