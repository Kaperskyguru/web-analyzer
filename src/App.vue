<template>
  <div id="app">
    <div id="page">
      <NavBar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style></style>
