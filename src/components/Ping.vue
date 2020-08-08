<template>
  <form v-on:submit.prevent="ping()" class="m-5">
    <div class="form-row">
      <div class="form-group mb-2 col-md-8 col-sm-12">
        <input
          type="url"
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
    <Loader :show="show" />
  </form>
</template>

<script>
import Loader from "./Loader";
export default {
  components: {
    Loader,
  },

  data() {
    return {
      show: false,
      url: "",
    };
  },

  methods: {
    async ping() {
      if (this.validateURL(this.url)) {
        this.show = true;
        try {
          await this.$store.dispatch("PingSite", this.url);
          this.$emit("show", true);
        } catch (error) {
          this.show = false;
        }
        this.show = false;
      } else {
        alert("Type in a valid web address");
      }
    },
    reset() {
      this.$store.dispatch("ResetStorage");
      this.$emit("show", false);
    },

    validateURL(url) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
        "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      return pattern.test(url);
    },
  },
};
</script>
