<script>
export default {
  props: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    value: {
      type: Number,
      required: true
    },
    weekly: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleChange(e) {
      this.$emit("handleChange", e.target.value);
    }
  }
};
</script>

<template>
  <div class="slidecontainer">
    <input class="slider" type="range" :min="min" :max="max" :value="value" @input="handleChange">
  </div>
</template>

<style scoped>
.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #7b93db;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #7b93db;
  cursor: pointer;
}
</style>
