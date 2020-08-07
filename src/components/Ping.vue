<template>
  <form action="post" class="m-5">
    <div class="form-row">
      <div class="form-group mb-2 col-md-8 col-sm-12">
        <input
          type="text"
          placeholder="Enter your web address here"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary mb-2 col-md-2 col-sm-6">
        Ping!
      </button>
      <button type="submit" class="btn btn-warning mb-2 col-md-1 col-sm-6">
        Reset
      </button>
    </div>
    <Loader :show="false" />
  </form>
</template>

<script>
import Loader from "./Loader";
export default {
  components: {
    Loader,
  },
};
</script>

<style></style>
