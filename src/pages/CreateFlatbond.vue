<script>
import { mapActions } from "vuex";

import constants from "../constants";

import scalarFormatter from "../formatters/scalar";
import calculateFlatbondBreakdown from "../util/calculate-flatbond-breakdown";

import Loader from "../components/Loader.vue";
import SliderControl from "../components/SliderControl.vue";
import SwitchControl from "../components/SwitchControl.vue";

export default {
  name: "CreateFlatbond",
  components: {
    Loader,
    SliderControl,
    SwitchControl
  },
  data() {
    return {
      loading: true
    };
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
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
      return this.$store.state.rentValue;
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
        fixedMembershipFee: false,
        fixedMembershipFeeAmountL: 0
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
  },
  methods: {
    ...mapActions(["setPaymentPeriod", "setRentValue"])
  }
};
</script>

<template>
  <div>
    <h1>Create FlatBond</h1>
    <transition name="fade">
      <Loader v-if="loading"/>
    </transition>
    <transition name="slide">
      <div class="content" v-if="!loading" :key="'Create Flatbond'">
        {{prettyRentValue}}
        <SliderControl
          :helpText="'Adjust rent'"
          :min="rentRangeMin"
          :max="rentRangeMax"
          :value="rentValue"
          :step="paymentPeriod === 'Weekly' ? 500 : 1000"
          @handleChange="setRentValue($event)"
        />
        Payment: {{paymentPeriod}}
        <SwitchControl :options="['Weekly', 'Monthly']" @handleChange="setPaymentPeriod($event)"/>
        <p>Membership fee (excl. VAT) {{flatbondBreakdown.membership_fee_before_vat}}</p>
        <p>Membership fee {{flatbondBreakdown.membership_fee}}</p>
        <router-link to="/details">details</router-link>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.content {
  transition: all 0.35s ease-out;
}
.slide-enter {
  opacity: 0;
  transform: translate(0, 100px);
}
.slide-leave-active {
  opacity: 0;
  transform: translate(0, -100px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
