<template>
  <div class="reporte">
    <h1>This is an about page2</h1>
    {{ $route.params.chain }}
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { ReporteClient } from "../api/api";

export default Vue.extend({});
</script>
