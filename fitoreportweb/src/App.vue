<template>
  <v-app>
    <AppBar />
    <v-container>
      <v-main>
        <div><router-view /></div>
      </v-main>
    </v-container>
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
