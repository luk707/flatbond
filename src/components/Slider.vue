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
  <div>
    <input type="range" :min="min" :max="max" :value="value" @input="handleChange">
  </div>
</template>

<style>
</style>

