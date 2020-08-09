import Http from "./Clients/AxioClient";
const resource = "/ping";

export default {
  async pingServer(url) {
    return await Http.get(`${resource}/?url=${url}`);
  },
};
