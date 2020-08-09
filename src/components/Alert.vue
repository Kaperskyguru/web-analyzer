<template>
  <div
    class="alert alert-danger alert-dismissible fade"
    :class="{ show: show }"
    role="alert"
  >
    {{ message }}
    <button
      type="button"
      @click="dismiss"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
    >
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

  methods: {
    dismiss() {
      this.show = false;
    },
  },
};
</script>

<style></style>
