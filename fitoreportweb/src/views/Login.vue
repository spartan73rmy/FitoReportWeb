<template>
  <div>
    <b-form v-model="valid" @submit.prevent="tryToLogIn">
      <b-form-group
        id="input-group-1"
        label="Nombre de Usuario"
        label-for="input-1"
        description=""
      >
        <b-form-input
          v-model="username"
          name="login"
          prepend-icon="fas fa-at"
          type="text"
          :rules="userNameRules"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password" label="Contraseña" label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          name="password"
          prepend-icon="lock"
          :type="showPass ? 'text' : 'password'"
          :rules="passwordRules"
          @keyup.enter="tryToLogIn"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Iniciar Sesion</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { required } from "@/utils/validation";
import { ResponseException } from "@/utils/utils";
import { LOGIN } from "@/store/action-types";
import { mapActions } from "vuex";
import { VForm } from "@/utils/my-types";

export default Vue.extend({
  data() {
    return {
      valid: false,
      username: "",
      password: "",
      authError: null as any,
      showPass: false,
      userNameRules: [required],
      passwordRules: [required],
      loading: false,
    };
  },
  computed: {
    form(): VForm {
      return this.$refs.form as VForm;
    },
  },
  methods: {
    ...mapActions("cuenta", { ingresar: LOGIN }),
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      // if (!this.form.validate() || this.loading) {
      //   return;
      // }
      // Reset the authError if it existed.
      this.authError = null;
      this.loading = true;
      return this.ingresar({
        nombreUsuario: this.username,
        password: this.password,
      })
        .then((user) => {
          this.loading = false;
          if (!user) return;
          // Redirect to the originally requested page, or to the home page
          return this.$router.push(
            (this.$route as any).query.redirectFrom || { name: "/home" }
          );
        })
        .catch((error: ResponseException) => {
          this.loading = false;
          this.authError = error.response?.data.error;
        });
    },
  },
});
</script>
