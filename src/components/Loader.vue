<template>
  <div class="color-loader" v-if="show"></div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
