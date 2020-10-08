import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Details from "../views/Details.vue";
Vue.use(VueRouter);

const parseId = (route: Route) => ({ id: parseInt(route.params.id) });

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView: any) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require("@/views/Loading.vue").default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require("@/views/Timeout.vue").default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  });

  return Promise.resolve({
    functional: true,
    render(h: any, { data, children }: any) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    },
  });
}

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/details/:id",
    name: "Details",
    component: () => lazyLoadView(import("@/views/Details.vue")),
    meta: {
      authRequired: true,
    },
    props: {
      default: parseId,
    },
  },
  {
    path: "/portafolio",
    name: "Reportes",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/Reporte.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: require("@/views/404").default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: "*",
    redirect: "404",
  },
];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });

// export default router;
