<template>
  <v-snackbar v-model="snackbar" :color="isError ? 'red' : 'green'" dark>
    <v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>
    <div>{{ message }}</div>
    <v-icon size="16" @click="snackbar = false">mdi-close-circle</v-icon>
  </v-snackbar>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { SHOW_MESSAGE } from "@/store/mutation-types";
export default Vue.extend({
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
