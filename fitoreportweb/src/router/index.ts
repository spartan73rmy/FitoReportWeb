import Router from "vue-router";
import routes from "@/router/routes";
import store from "@/store";
import NProgress from "nprogress";
import { LOGOUT } from "@/store/mutation-types";

const router = new Router({
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: "history",
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  function redirectToLogin() {
    store.commit("cuenta/" + LOGOUT);
    // Pass the original route to the login component
    next({ name: "Login", query: { redirectFrom: routeTo.fullPath } });
  }

  // If this isn't an initial page load...
  if (routeFrom.name !== null) {
    // Start the route progress bar.
    NProgress.start();
  }

  // Check if auth is required on this route
  // (including nested routes).
  const userSpecified = routeTo.matched.some(
    (route) => route.meta.userRequired !== undefined
  );

  const authRequired =
    userSpecified || routeTo.matched.some((route) => route.meta.authRequired);

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next();

  const isLoggedIn = store.getters["cuenta/loggedIn"];
  // If auth is required and the user is NOT currently logged in,
  // redirect to login.
  if (!isLoggedIn) return redirectToLogin();

  // If auth is required and the user is logged in...
  if (userSpecified) {
    const mStore: any = store.state;
    const currentUser = mStore["cuenta"]["currentUser"];
    // eslint-disable-next-line no-unused-vars
    for (const userRequired of routeTo.matched
      .filter((el) => el.meta.userRequired != undefined)
      .map((route) => route.meta.userRequired)) {
      if (Array.isArray(userRequired)) {
        if (userRequired.every((user) => user !== currentUser.tipoUsuario)) {
          return redirectToLogin();
        }
      } else {
        if (userRequired !== currentUser.tipoUsuario) {
          return redirectToLogin();
        }
      }
    }
  }

  return next();
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    // eslint-disable-next-line no-unused-vars
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args: any[]) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              if (routeFrom.name === args[0].name) {
                // Complete the animation of the route progress bar.
                NProgress.done();
              }
              // Complete the redirect.
              next(...args);
              reject(new Error("Redirected"));
            } else {
              resolve();
            }
          });
        } else {
          // Otherwise, continue resolving the route.
          resolve();
        }
      });
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return;
  }

  // If we reach this point, continue resolving the route.
  next();
});

// When each route is finished evaluating...
router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
