<template>
  <v-app>
    <v-main>
      <AppBar />
      <v-container>
        <br /><br /><br />
        <router-view />
      </v-container>
    </v-main>
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
