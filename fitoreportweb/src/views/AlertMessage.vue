<template>
  <div id="AlertMessage">
    <b-alert v-if="isError" v-model="snackbar" variant="danger" dismissible>
      {{ message }}
    </b-alert>
    <b-alert v-else v-model="snackbar" variant="success" dismissible>
      {{ message }}
    </b-alert>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { SHOW_MESSAGE } from "@/store/mutation-types";
export default Vue.extend({
  name: "AlertMessage",
  computed: {
    snackbar: {
      get() {
        return this.showMessage;
      },
      set(value) {
        this.$store.commit("alert/" + SHOW_MESSAGE, value);
      },
    },
    ...mapState("alert", ["message", "isError", "showMessage"]),
  },
});
</script>
