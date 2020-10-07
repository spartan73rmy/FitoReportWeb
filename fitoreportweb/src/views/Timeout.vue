<template>
  <div v-if="offlineConfirmed">
    <h1>
      The page timed out while loading. Are you sure you're still connected to
      the Internet?
    </h1>
  </div>
  <Loading v-else />
</template>
<script lang="ts">
import Loading from "@/views/Loading.vue";
import Vue from "vue";
import { cuentaClient } from "@/services/api/api.service";
export default Vue.extend({
  components: { Loading },
  data() {
    return {
      offlineConfirmed: false
    };
  },
  created(): void {
    cuentaClient
      .ping()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        this.offlineConfirmed = true;
      });
  }
});
</script>
