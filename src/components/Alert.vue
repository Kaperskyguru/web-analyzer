<template>
  <div
    class="alert alert-danger alert-dismissible fade"
    :class="{ show: show }"
    role="alert"
  >
    {{ message }} {{ show }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
