import { SHOW_LOADING } from "@/store/mutation-types";
import { GetterTree, MutationTree, Module } from "vuex";

interface State {
  showLoading: boolean;
}
const state = {
  showLoading: false
} as State;

const getters = {
  showLoading: state => state.showLoading
} as GetterTree<State, any>;

const mutations = {
  [SHOW_LOADING](state, value) {
    state.showLoading = value;
  }
} as MutationTree<State>;

const namespaced = false;

export default {
  state,
  getters,
  mutations,
  namespaced
} as Module<State, any>;
