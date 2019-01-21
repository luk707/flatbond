export const STORAGE_KEY = "flatbond";

export default {
  setPaymentPeriod(state, paymentPeriod) {
    state.paymentPeriod = paymentPeriod;
  },
  setRentRangeMin(state, rentRangeMin) {
    state.rentRangeMin = rentRangeMin;
  },
  setRentRangeMax(state, rentRangeMax) {
    state.rentRangeMax = rentRangeMax;
  },
  setRentValue(state, rentValue) {
    state.rentValue = rentValue;
  }
};
