export default {
  setPaymentPeriod({ commit }, paymentPeriod) {
    commit("setPaymentPeriod", paymentPeriod);
    commit("setRentRangeMin", paymentPeriod === "Weekly" ? 2500 : 11000);
    commit("setRentRangeMax", paymentPeriod === "Weekly" ? 200000 : 866000);
    commit("setRentValue", paymentPeriod === "Weekly" ? 2500 : 11000);
  },
  setRentValue({ commit }, rentValue) {
    commit("setRentValue", rentValue);
  }
};
