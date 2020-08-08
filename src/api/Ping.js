import Http from "./Clients/AxioClient";
const resource = "/ping";

export default {
  ping(url) {
    return Http.get(`${resource}?url=$${url}`);
  },
};
