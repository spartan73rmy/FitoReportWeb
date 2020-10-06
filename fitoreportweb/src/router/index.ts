import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Details from "../views/Details.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:chain",
    name: "Details",
    component: Details,
  },
  {
    path: "/reporte",
    name: "Reporte",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Reporte.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
