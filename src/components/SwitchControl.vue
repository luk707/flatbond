<script>
export default {
  name: "SwitchControl",
  props: {
    active: {
      type: String,
      required: true
    },
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
      :class="option === active ? 'switch-control-button active' : 'switch-control-button'"
      v-for="option in options"
      :key="option"
      v-on:click="handleChange(option)"
      type="button"
    >{{option}}</button>
  </div>
</template>

<style scoped>
.switch-control {
  display: flex;
  margin-bottom: 16px;
}
.switch-control-button {
  border: none;
  padding: 10px 16px;
  background-color: #eee;
  font-size: 20px;
  color: black;
}

.switch-control-button.active {
  background-color: #6785ff;
  color: white;
}

.switch-control-button:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.switch-control-button:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>

