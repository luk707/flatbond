<script>
import Slider from "./components/Slider.vue";
import SwitchControl from "./components/SwitchControl.vue";

export default {
  name: "App",
  components: {
    Slider,
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
  <div :class="$style.App">
    <h1>Flatbond app</h1>
    {{rentValue}}
    <Slider
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
  </div>
</template>

<style module>
@import url("https://fonts.googleapis.com/css?family=Sarabun:400,600,800");

.App {
  padding: 20px;
  font-family: "Sarabun", sans-serif;
}
</style>
