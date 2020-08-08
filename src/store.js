import Vue from "vue";
import Vuex from "vuex";

import Storage from "./services/StorageService";
import Ping from "./api/Ping";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sites: Array.from(Storage.getAll()),
    errors: [],
  },

  actions: {
    async ResetStorage({ commit }) {
      commit("RESET_SITES");
    },

    async PingSite({ commit }, payload) {
      const response = await Ping.pingServer(payload);
      const { data } = response;
      if (data.address) {
        commit("STORE_SITE", data);
      } else {
        // Do something better with error
        commit("STORE_ERROR", data);
      }
    },

    async DeleteSite({ commit }, key) {
      commit("DELETE_SITE", key);
    },
  },

  mutations: {
    RESET_SITES: (state) => {
      Storage.resetAll();
      state.sites = [];
    },

    DELETE_SITE: (state, key) => {
      Storage.delete(key);
      const index = state.sites.findIndex((site) => site.key == key);
      state.sites.splice(index, 1);
    },

    STORE_SITE: (state, payload) => {
      Storage.store(payload.key, payload);
      state.sites.push(payload);
    },

    STORE_ERROR: (state, payload) => {
      state.errors = payload;
    },
  },
});

export default store;
