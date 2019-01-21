<script>
import { mapActions } from "vuex";
import axios from "axios";

import constants from "../constants";

import scalarFormatter from "../formatters/scalar";
import calculateFlatbondBreakdown from "../util/calculate-flatbond-breakdown";
import validUkPostcode from "../util/valid-uk-postcode";

import Loader from "../components/Loader.vue";
import SliderControl from "../components/SliderControl.vue";
import SwitchControl from "../components/SwitchControl.vue";
import InputControl from "../components/InputControl.vue";

export default {
  name: "CreateFlatbond",
  components: {
    Loader,
    SliderControl,
    SwitchControl,
    InputControl
  },
  data() {
    return {
      loading: true,
      submitting: false,
      error: null,
      postcodeValidator: v => {
        if (!v) {
          return "You must enter your postcode";
        }
        if (!validUkPostcode(v)) {
          return "You must enter a valid UK postcode";
        }
        return "";
      }
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
        this.$store.commit(
          "setMembershipFee",
          response.data.fixed_membership_fee
        );
        this.$store.commit(
          "setMembershipFeeAmount",
          response.data.fixed_membership_fee_amount / 100
        );
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
  },
  methods: {
    ...mapActions(["setPaymentPeriod", "setRentValue", "setPostcode"]),
    handleSubmit(e) {
      e.preventDefault();
      if (this.postcodeValidator(this.postcode)) {
        this.error = "Correct errors in the form before continuing";
        return;
      }
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
    <div class="error" v-if="error !== null">{{error}}</div>
    <transition name="fade">
      <Loader v-if="loading || submitting"/>
    </transition>
    <transition name="slide">
      <div class="content" v-if="!loading && !submitting" :key="'Create Flatbond'">
        <form @submit="handleSubmit">
          <SwitchControl
            :active="paymentPeriod"
            :options="['Weekly', 'Monthly']"
            @handleChange="setPaymentPeriod($event)"
          />
          {{`${prettyRentValue} ${paymentPeriod === 'Weekly' ? 'pw' : 'pcm'}`}}
          <SliderControl
            :helpText="'Adjust rent'"
            :min="rentRangeMin"
            :max="rentRangeMax"
            :value="rentValue"
            :step="paymentPeriod === 'Weekly' ? 500 : 1000"
            @handleChange="setRentValue($event)"
          />
          <div>
            <label>Postcode</label>
          </div>
          <InputControl
            :format="v => v.toUpperCase()"
            :validate="postcodeValidator"
            :value="postcode"
            @handleChange="setPostcode($event)"
          />
          <p
            class="caveat"
          >Membership fee (excl. VAT) {{flatbondBreakdown.membership_fee_before_vat}}</p>
          <p class="caveat">Membership fee {{flatbondBreakdown.membership_fee}}</p>
          <button class="submit-button">Submit</button>
        </form>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.content {
  transition: all 0.65s ease-out;
}
.slide-enter {
  opacity: 0;
  transform: translate(0, 10px);
}
.slide-leave-active {
  opacity: 0;
  transform: translate(0, 10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.submit-button {
  margin-top: 10px;
  border: none;
  padding: 10px 16px;
  background-color: #6785ff;
  font-size: 20px;
  color: white;
  border-radius: 3px;
}

label {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 14px;
}

.caveat {
  line-height: 10px;
  font-size: 14px;
  color: #888;
}

.error {
  background-color: #facdcd;
  color: #610404;
  border-left: 5px solid #e66a6a;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
