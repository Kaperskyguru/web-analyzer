<template>
  <section id="home" class="video-hero">
    <div class="overlay"></div>
    <div class="display-t text-center">
      <div class="display-tc">
        <div class="container">
          <div class="col-md-12 col-md-offset-0">
            <div class="animate-box">
              <h2>Check the load time of your website</h2>
              <p class="text-warning">
                with just one click of a button and track previous histories.
              </p>
              <Ping v-on:show="showHistory" />
            </div>
          </div>
          <History :show="show" :data="sites" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import History from "../components/History.vue";
import Ping from "../components/Ping.vue";
import { mapState } from "vuex";
export default {
  components: {
    History,
    Ping,
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapState(["sites"]),
  },

  methods: {
    showHistory(e) {
      this.show = e;
    },
  },

  mounted() {
    this.show = this.sites.length !== 0 ? true : false;
  },
};
</script>

<style scoped>
.video-hero {
  height: 700px;
  background-image: url(/images/cover_img_1.jpg);
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
}
</style>
