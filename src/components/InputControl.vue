<script>
export default {
  name: "InputControl",
  props: {
    value: {
      type: String,
      required: true
    },
    format: {
      type: Function,
      required: false,
      default: v => v
    },
    validate: {
      type: Function,
      required: false,
      default: v => ""
    }
  },
  methods: {
    revalidate(value = this.value) {
      const error = this.validate(value);
      this.error = error;
      if (!error) {
        this.pristine = true;
      }
    },
    handleChange(e) {
      if (!this.pristine) {
        this.revalidate(e.target.value);
      }
      this.$emit("handleChange", this.format(e.target.value));
    },
    handleBlur() {
      if (this.validate(this.value)) {
        this.pristine = false;
        this.revalidate();
      }
    }
  },
  data() {
    return {
      pristine: true,
      error: ""
    };
  }
};
</script>

<template>
  <div class="input-container">
    <input
      :class="error ? 'input invalid' : 'input'"
      :value="value"
      @input="handleChange"
      @blur="handleBlur"
    >
    <div v-if="error" class="error">{{error}}</div>
  </div>
</template>

<style scoped>
.input-container {
  margin-bottom: 16px;
}

.input {
  margin-top: 3px;
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 10px 16px;
  font-size: 18px;
  font-weight: 600;
  transition: box-shadow 100ms ease-out;
  box-shadow: 0 0 0 0 #aabbff;
}

.input.invalid {
  border: 1px solid #facdcd;
  background-color: #ffeeee;
  color: #610404;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 3px #aabbff;
}

.error {
  color: #911111;
}
</style>

