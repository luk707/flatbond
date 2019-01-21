import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import mutations, { STORAGE_KEY } from "./mutations";
import plugins from "./plugins";

Vue.use(Vuex);

const initialState = {
  postcode: "",
  paymentPeriod: "Weekly",
  rentValue: 2500,
  rentRangeMin: 2500,
  rentRangeMax: 200000,
  membershipFee: false,
  membershipFeeAmount: 0
};

export default new Vuex.Store({
  state: JSON.parse(
    // window.localStorage.getItem(STORAGE_KEY) ||
    JSON.stringify(initialState)
  ),
  actions,
  mutations,
  plugins
});
