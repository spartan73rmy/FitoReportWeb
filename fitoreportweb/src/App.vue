<template>
  <v-app>
    <v-card class="overflow-hidden">
      <AppBar />
      <v-sheet
        id="scrolling-techniques-5"
        class="overflow-y-auto"
        max-height="700"
      >
        <v-container style="height: 1500px;">
          <v-main>
            <router-view />
          </v-main>
        </v-container>
      </v-sheet>
    </v-card>
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
