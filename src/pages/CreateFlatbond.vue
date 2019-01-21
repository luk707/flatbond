<script>
import { mapActions } from "vuex";
import axios from "axios";

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
      loading: true,
      submitting: false,
      error: null,
      fixed_membership_fee: false,
      fixed_membership_fee_amount: 0
    };
  },
  created() {
    // Ensure store is prepped for new entry
    this.$store.commit("setPostcode", "");
    this.$store.commit("setRentValue", 2500);
    this.$store.commit("setRentRangeMin", 2500);
    this.$store.commit("setRentRangeMax", 200000);
    this.loading = true;
    this.error = null;
    axios
      .get(
        "https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/config"
      )
      .then(response => {
        this.fixed_membership_fee = response.data.fixed_membership_fee;
        this.fixed_membership_fee_amount =
          response.data.fixed_membership_fee_amount / 100;
        this.loading = false;
      })
      .catch(error => {
        this.error = "There was an error fetching the configuration";
      });
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
        fixedMembershipFee: this.fixed_membership_fee || false,
        fixedMembershipFeeAmount: this.fixed_membership_fee_amount || 0
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
    ...mapActions(["setPaymentPeriod", "setRentValue"]),
    handleSubmit(e) {
      e.preventDefault();
      // TODO, validate
      this.submitting = true;
      axios
        .post(
          "https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/flatbond",
          {
            rent_value: this.rentValue,
            postcode: this.postcode
          }
        )
        .then(() => {
          // success=
          this.$router.push({ path: "/details" });
        })
        .catch(() => {
          this.submitting = false;
          this.error = "There was an error submitting";
          //error submitting
        });
    }
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
        <form @submit="handleSubmit">
          {{`${prettyRentValue} ${paymentPeriod === 'Weekly' ? 'pw' : 'pcm'}`}}
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
          <button>Submit</button>
        </form>
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
