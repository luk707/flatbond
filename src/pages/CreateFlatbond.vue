<script>
import { mapActions } from "vuex";

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
        {{rentValue}}
        <SliderControl
          :helpText="'Adjust rent'"
          :min="rentRangeMin"
          :max="rentRangeMax"
          :value="rentValue"
          @handleChange="setRentValue($event)"
        />
        Payment: {{paymentPeriod}}
        <SwitchControl :options="['Weekly', 'Monthly']" @handleChange="setPaymentPeriod($event)"/>
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
