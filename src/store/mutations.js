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
  },
  setPostcode(state, postcode) {
    state.postcode = postcode;
  },
  setMembershipFee(state, membershipFee) {
    state.membershipFee = membershipFee;
  },
  setMembershipFeeAmount(state, membershipFeeAmount) {
    state.membershipFeeAmount = membershipFeeAmount;
  }
};
