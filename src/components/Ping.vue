<template>
  <form v-on:submit.prevent="ping()" class="m-5">
    <div class="form-row">
      <div class="form-group mb-2 col-md-8 col-sm-12">
        <input
          type="text"
          v-model="url"
          placeholder="Enter your web address here"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary mb-2 col-md-2 col-sm-6">
        Ping!
      </button>
      <button
        type="button"
        @click.prevent="reset()"
        class="btn btn-warning mb-2 col-md-1 col-sm-6"
      >
        Reset
      </button>
    </div>
    <Alert :show="showError" :message="errors.message" v-if="showError" />
    <Loader :show="show" />
  </form>
</template>

<script>
import Loader from "./Loader";
import Alert from "./Alert";
import { mapState } from "vuex";
export default {
  components: {
    Loader,
    Alert,
  },

  data() {
    return {
      show: false,
      url: "",
    };
  },
  computed: {
    ...mapState(["errors"]),
    showError() {
      return this.errors.length !== 0;
    },
  },

  methods: {
    async ping() {
      const url = this.validateURL(this.url);
      if (url) {
        this.show = true;
        try {
          await this.$store.dispatch("PingSite", url);
          this.$emit("show", true);
        } catch (error) {
          this.show = false;
        }
        this.show = false;
      } else {
        alert("Type in a valid web address: (https://example.com)");
      }
    },
    reset() {
      this.$store.dispatch("ResetStorage");
      this.$emit("show", false);
    },

    validateURL(url) {
      try {
        if (url.substr(0, 2) === "ww") {
          url = "https://" + url;
        }
        new URL(url);
      } catch (error) {
        return false;
      }
      return url;
    },
  },
};
</script>
