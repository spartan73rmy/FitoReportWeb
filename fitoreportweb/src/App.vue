<template>
  <div>
    <AppBar />
    <br /><br />
    Hola Bienvenido
    <br />

    <AlertMessage />
    <br />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "./components/AppBar.vue";
import AlertMessage from "./views/AlertMessage.vue";
import { mapGetters, mapState, mapMutations } from "vuex";
import cuenta from "./store/modules/cuenta";

export default Vue.extend({
  name: "App",
  components: {
    AppBar,
    AlertMessage,
  },
  data: () => ({
    snackbar: true,
  }),
  computed: {
    ...mapState("cuenta", {
      currentUser: (state) => state,
    }),
    ...mapGetters(["showLoading"]),
    ...mapGetters("cuenta", ["loggedIn"]),
  },
});
</script>
<style>
@import "~nprogress/nprogress.css";
#nprogress .bar {
  background: red;
}
#nprogress .spinner {
  display: none;
}
</style>
