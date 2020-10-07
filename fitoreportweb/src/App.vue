<template>
  <v-app>
    <AppBar />
    <v-content>
      <br /><br /><br />
      <router-view :key="$route.fullPath"></router-view>
      <AlertMessage />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "./components/AppBar.vue";
export default Vue.extend({
  name: "App",

  components: {
    AppBar,
  },

  data: () => ({
    //
  }),
});
</script>
