import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import mutations, { STORAGE_KEY } from "./mutations";
import plugins from "./plugins";

Vue.use(Vuex);

const initialState = {
  paymentPeriod: "Weekly",
  rentValue: 25,
  rentMin: 0,
  rentMax: 1000
};

export default new Vuex.Store({
  state: JSON.parse(
    window.localStorage.getItem(STORAGE_KEY) || JSON.stringify(initialState)
  ),
  actions,
  mutations,
  plugins
});
