<script>
import Slider from "./components/Slider.vue";

export default {
  name: "App",
  components: {
    Slider
  },
  data() {
    return {
      weekly: true,
      weeklyRent: {
        value: 25
      }
    };
  },
  methods: {
    handleChange(payload) {
      // Crude way to turn a string into a number
      this.weeklyRent.value = ~~payload;
    }
  }
};
</script>

<template>
  <div :class="$style.App">
    <h1>Flatbond app</h1>
    {{weeklyRent.value}}
    <Slider :min="1" :max="10" :value="weeklyRent.value" @handleChange="handleChange($event)"/>
  </div>
</template>

<style module>
@import url("https://fonts.googleapis.com/css?family=Sarabun:400,600,800");

.App {
  padding: 20px;
  font-family: "Sarabun", sans-serif;
}
</style>
