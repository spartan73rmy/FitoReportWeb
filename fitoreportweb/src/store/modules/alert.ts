import { SHOW_MESSAGE, MESSAGE, ERROR } from "@/store/mutation-types";
import { Module } from "vuex";
interface State {
  showMessage: boolean;
  message: string | null;
  isError: boolean;
}

const state = {
  showMessage: false,
  isError: false,
  message: null,
} as State;

const mutations = {
  [SHOW_MESSAGE](state: State, payload: any) {
    state.showMessage = !!payload;
  },
  [MESSAGE](state: State, payload: string) {
    state.message = payload;
    state.isError = false;
    state.showMessage = true;
  },
  [ERROR](state: State, payload: string) {
    state.message = payload;
    state.isError = true;
    state.showMessage = true;
  },
};
export default {
  state,
  mutations,
  namespaced: true,
} as Module<State, any>;
