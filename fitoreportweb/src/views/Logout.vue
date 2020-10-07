<template>
  <p>Saliendo</p>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { cuentaClient } from "@/services/api/api.service";
import { LOGOUT_ACTION } from "@/store/action-types";
import { InvalidaTokenCommand } from "@/services/api/api";
import { getSavedState } from "@/services/local-storage.service";
export default Vue.extend({
  created() {
    this.logMeOut();
  },
  methods: {
    ...mapActions("cuenta", { logout: LOGOUT_ACTION }),
    async logMeOut() {
      const refreshToken = getSavedState("auth.refreshToken");
      this.logout();
      try {
        const result = await cuentaClient.invalidaToken(
          new InvalidaTokenCommand({
            refreshToken: refreshToken
          })
        );
      } catch (e) {
        // console.log(e);
      }
    }
  }
});
</script>
