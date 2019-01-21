<script>
import constants from "../constants";
import scalarFormatter from "../formatters/scalar";
import calculateFlatbondBreakdown from "../util/calculate-flatbond-breakdown";

export default {
  computed: {
    paymentPeriod() {
      return this.$store.state.paymentPeriod;
    },
    rentRangeMin() {
      return this.$store.state.rentRangeMin;
    },
    rentRangeMax() {
      return this.$store.state.rentRangeMax;
    },
    rentValue() {
      // Convert to number
      return ~~this.$store.state.rentValue;
    },
    postcode() {
      return this.$store.state.postcode;
    },
    prettyRentValue() {
      return scalarFormatter(
        constants.currencyScalarConfig,
        this.$store.state.rentValue / 100
      );
    },
    flatbondBreakdown() {
      const {
        membership_fee_before_vat,
        membership_fee
      } = calculateFlatbondBreakdown({
        rentValue: this.$store.state.rentValue / 100,
        monthly: this.$store.state.paymentPeriod === "Monthly",
        fixedMembershipFee: this.$store.state.membershipFee || false,
        fixedMembershipFeeAmount: this.$store.state.membershipFeeAmount || 0
      });
      return {
        membership_fee_before_vat: scalarFormatter(
          constants.currencyScalarConfig,
          membership_fee_before_vat
        ),
        membership_fee: scalarFormatter(
          constants.currencyScalarConfig,
          membership_fee
        )
      };
    }
  }
};
</script>

<template>
  <div>
    <h1>Your FlatBond</h1>
    <div>
      <span class="price">{{`${prettyRentValue} ${paymentPeriod === 'Weekly' ? 'pw' : 'pcm'}`}}</span>
    </div>
    <p class="caveat">Membership fee (excl. VAT) {{flatbondBreakdown.membership_fee_before_vat}}</p>
    <p class="caveat">Membership fee {{flatbondBreakdown.membership_fee}}</p>
    <router-link class="button-link" to="/">create another flatbond</router-link>
  </div>
</template>

<style scoped>
.price {
  font-weight: 400;
  font-size: 28px;
}
.caveat {
  line-height: 10px;
  font-size: 14px;
  color: #888;
}
.button-link {
  display: inline-block;
  margin-top: 10px;
  border: none;
  padding: 10px 16px;
  background-color: #6785ff;
  font-size: 20px;
  color: white;
  border-radius: 3px;
  text-decoration: none;
}
</style>

