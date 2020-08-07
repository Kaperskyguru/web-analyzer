<template>
  <table
    class="table table-bordered table-hover table-active text-white table-sm table-responsive-md"
    v-if="show"
  >
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Icon</th>
        <th scope="col">Site</th>
        <th scope="col">Ping</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(site, i) of data" :key="i">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ site.icon }}</td>
        <td>{{ site.address }}</td>
        <td>{{ site.result }}ms</td>
        <td>
          <button
            type="button"
            @click="deleteSite(site.key)"
            class="btn btn-danger"
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DeleteIcon from "./icons/Delete";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: [Array],
      default: () => [],
    },
  },

  methods: {
    deleteSite(key) {
      this.$store.dispatch("DeleteSite", key);
    },
  },

  components: {
    DeleteIcon,
  },
};
</script>

<style></style>
