<script>
import SliderControl from "../components/SliderControl.vue";
import SwitchControl from "../components/SwitchControl.vue";

export default {
  name: "CreateFlatbond",
  components: {
    SliderControl,
    SwitchControl
  },
  data() {
    return {
      paymentPeriod: "Weekly",
      rentValue: 25,
      rentMin: 0,
      rentMax: 1000
    };
  },
  methods: {
    handleRentChange(payload) {
      // Crude way to turn a string into a number
      this.rentValue = ~~payload;
    },
    handlePaymentPeriodChange(payload) {
      // Crude way to turn a string into a number
      this.paymentPeriod = payload;
    }
  }
};
</script>

<template>
  <div>
    <h1>Flatbond app</h1>
    {{rentValue}}
    <SliderControl
      :helpText="'Adjust rent'"
      :min="rentMin"
      :max="rentMax"
      :value="rentValue"
      @handleChange="handleRentChange($event)"
    />
    Payment: {{paymentPeriod}}
    <SwitchControl
      :options="['Weekly', 'Monthly']"
      @handleChange="handlePaymentPeriodChange($event)"
    />
    <router-link to="/details">details</router-link>
  </div>
</template>
