import "@babel/polyfill";
import "mutationobserver-shim";
import "./plugins/bootstrap-vue";
import "./registerServiceWorker";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import { axiosInstance } from "@/services/api/api.service";
import { SHOW_LOADING } from "./store/mutation-types";

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    store.commit(SHOW_LOADING, true, { root: true });
    return config;
  },
  error => {
    store.commit(SHOW_LOADING, false, { root: true });
    return error;
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    store.commit(SHOW_LOADING, false, { root: true });
    return response;
  },
  function(error) {
    store.commit(SHOW_LOADING, false, { root: true });
    return Promise.reject(error);
  }
);

moment.locale("es-do");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
