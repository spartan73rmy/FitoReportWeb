/*jslint node:true */

import {
  IngresarResponse,
  RefreshCredentialsCommand,
} from "@/services/api/api";
import { axiosInstance, cuentaClient as api } from "@/services/api/api.service";
import { destroyToken, getToken, saveToken } from "@/services/jwt.service";
import {
  getSavedState,
  removeState,
  saveState,
} from "@/services/local-storage.service";
import { LOGOUT, SET_AUTH } from "@/store/mutation-types";
import {
  CONFIRM_ACCOUNT,
  LOGIN,
  LOGOUT_ACTION,
  REFRESH_CREDENTIALS,
  REGISTER,
} from "@/store/action-types";
import { buildSuccess, handleError } from "@/utils/utils";
import router from "@/router";
import {
  ActionTree,
  Commit,
  Dispatch,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import moment from "moment";
import { UserAdmin, UserProductor, UserIngeniero } from "@/utils/constants";

let refreshing = false;
let failedQueue: any[] = [];

interface State {
  currentUser: any;
}

const processQueue = (error: any, token: string | null | undefined) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const expirationDate = function() {
  const dateString = getSavedState("auth.expirationDate");
  if (!dateString) return null;
  return moment(dateString);
};

const state = {
  currentUser: getSavedState("auth.currentUser"),
} as State;

const mutations = {
  [SET_AUTH](state: State, payload: IngresarResponse) {
    saveState("auth.currentUser", payload.user);
    saveState("auth.refreshToken", payload.refreshToken);
    saveState("auth.expirationDate", payload.expirationDate);
    saveToken(payload.token as string);

    state.currentUser = payload.user;
  },
  [LOGOUT](state) {
    state.currentUser = null;

    destroyToken();
    removeState("auth.currentUser");
    removeState("auth.refreshToken");
    removeState("auth.expirationDate");
  },
} as MutationTree<State>;

const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  },
  isAlumno(state, getters): boolean {
    return getters.loggedIn && state.currentUser.tipoUsuario === UserProductor;
  },
  isMaestro(state, getters): boolean {
    return getters.loggedIn && state.currentUser.tipoUsuario === UserIngeniero;
  },
  isAdmin(state, getters): boolean {
    return getters.loggedIn && state.currentUser.tipoUsuario === UserAdmin;
  },
} as GetterTree<State, any>;

function setRefreshTokenInterceptor(
  state: State,
  dispatch: Dispatch,
  commit: Commit
) {
  // TODO Checar que esto funcione bien
  axiosInstance.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = "Bearer " + getToken();

      // Todas las llamadas a cuenta no se necesita authenticacion
      // todas son referentes a ingresar, invalidar token, refresco de token
      // confirmar cuenta etc.
      if (config.url && config.url.toLowerCase().includes("/api/cuenta")) {
        return config;
      }
      const exp = expirationDate();
      if (exp !== null && moment().isAfter(exp)) {
        if (!refreshing) {
          refreshing = true;
          return dispatch(REFRESH_CREDENTIALS)
            .then(() => {
              const token = getToken();
              config.headers.Authorization = `Bearer ${token}`;
              processQueue(null, token);
              refreshing = false;
              return config;
            })
            .catch((err) => {
              refreshing = false;
              processQueue(err, null);
              return Promise.reject(err);
            });
        } else {
          return new Promise(function(resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              config.headers.Authorization = `Bearer ${token}`;
              return config;
            })
            .catch((err) => {
              processQueue(err, null);
              return Promise.reject(err);
            });
        }
      }
      return config;
    },
    (error) => {
      processQueue(error, null);
      refreshing = false;
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.status < 200 || response.status > 299) {
        const error = {
          message: "Error al consultar informacion",
          name: "Error",
          response: response,
        };
        handleError(error, commit);
      }
      return response;
    },
    (error) => {
      handleError(error, commit);
      return Promise.reject(error);
    }
  );
}

const refreshToken = function() {
  return getSavedState("auth.refreshToken");
};

const actions = {
  init({ state, dispatch, commit }) {
    setRefreshTokenInterceptor(state, dispatch, commit);
  },
  async [LOGIN]({ commit }, payload) {
    const response = await api.ingresar(payload);
    commit(SET_AUTH, response);
    return buildSuccess(response, commit);
  },
  async [REGISTER]({ commit }, payload) {
    const response = await api.createUser(payload);
    return buildSuccess(response, commit);
  },
  async [REFRESH_CREDENTIALS]({ commit }) {
    const response = await api.refreshCredentials(
      new RefreshCredentialsCommand({
        refreshToken: refreshToken(),
        token: getToken(),
      })
    );
    commit(SET_AUTH, response);
    return buildSuccess(response, commit);
  },
  async [CONFIRM_ACCOUNT]({ commit }, payload) {
    const response = await api.confirmar(payload);
    return buildSuccess(response, commit);
  },
  [LOGOUT_ACTION]({ commit }) {
    commit(LOGOUT);
    return router.push("/login");
  },
} as ActionTree<State, any>;

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
} as Module<State, any>;
