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
      if (this.url) {
        this.show = true;
        const t0 = performance.now();
        await fetch(this.url, { mode: "no-cors", cache: "no-cache" });
        const t1 = performance.now();
        console.log(
          window.performance.timing.domContentLoadedEventEnd -
            window.performance.timing.navigationStart
        );
        const payload = {};
        await this.getFavicon();
        payload.icon = "Lara";
        payload.result = t1 - t0;

        this.storeSite(payload);
        console.log(
          `Call to doSomething took ${t1 - t0} milliseconds.`,
          this.url
        );
        this.show = false;
      } else {
        alert("Type in a website");
      }
    },
    reset() {
      this.$store.dispatch("ResetStorage");
    },

    storeSite(data) {
      const ranKey = Math.random()
        .toString(36)
        .substring(5);

      const payload = {};
      payload.icon = data.icon;
      payload.key = ranKey;
      payload.address = this.url;
      payload.result = data.result;
      this.$store.dispatch("StoreSite", payload);
      this.$emit("show", true);
    },

    async getFavicon() {
      console.log(
        await fetch(
          `https://s2.googleusercontent.com/s2/favicons?domain=${this.url}`,
          { mode: "no-cors" }
        )
      );
    },
  },
};
</script>

<style></style>
