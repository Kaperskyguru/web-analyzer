import Http from "./Clients/AxioClient";
const resource = "/ping";

export default {
  async ping(url) {
    return await Http.get(`${resource}?url=${url}`);
  },

  async pingwithPuppeteer(url) {
    return await Http.get(`/puppeteer?url=${url}`);
  },
};
