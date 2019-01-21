<script>
export default {
  name: "SwitchControl",
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleChange(e) {
      this.$emit("handleChange", e);
    }
  }
};
</script>

<template>
  <div class="switch-control">
    <button
      class="switch-control-button"
      v-for="option in options"
      :key="option"
      v-on:click="handleChange(option)"
    >{{option}}</button>
  </div>
</template>

<style scoped>
.switch-control {
  background-color: bisque;
}
.switch-control-button {
  background-color: green;
}
</style>

