import Vue from "vue";
import Vuex from "vuex";

import Storage from "./services/StorageService";
import Ping from "./api/Ping";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sites: [...Array.from(Storage.getAll())],
  },

  actions: {
    async ResetStorage({ commit }) {
      Storage.resetAll();
      commit("RESET_SITES");
    },

    async PingSite({ commit }, payload) {
      const response = await Ping.pingwithPuppeteer(payload);
      const { data } = response;
      if (data.address) {
        commit("STORE_SITE", data);
      }
      console.log(data);
    },

    async DeleteSite({ commit }, key) {
      Storage.delete(key);
      commit("DELETE_SITE", key);
    },
  },

  mutations: {
    RESET_SITES: (state) => {
      state.sites = [];
    },

    DELETE_SITE: (state, key) => {
      const index = state.sites.findIndex((site) => site.key == key);
      state.sites.splice(index, 1);
    },

    STORE_SITE: (state, payload) => {
      Storage.post(payload.key, payload);
      state.sites.push(payload);
    },
  },
});

export default store;
