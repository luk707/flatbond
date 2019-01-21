<script>
export default {
  props: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    value: {
      type: Number,
      required: true
    },
    helpText: {
      type: String,
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
    <svg
      width="39px"
      height="11px"
      viewBox="0 0 39 11"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-216.000000, -197.000000)" fill="#979797" fill-rule="nonzero">
          <polygon
            id="Line-3"
            points="225.245131 206.564212 225.680918 206.809343 225.190657 207.680918 224.754869 207.435788 216.754869 202.935788 215.980136 202.5 216.754869 202.064212 224.754869 197.564212 225.190657 197.319082 225.680918 198.190657 225.245131 198.435788 218.908753 202 225 202 246 202 252.091247 202 245.754869 198.435788 245.319082 198.190657 245.809343 197.319082 246.245131 197.564212 254.245131 202.064212 255.019864 202.5 254.245131 202.935788 246.245131 207.435788 245.809343 207.680918 245.319082 206.809343 245.754869 206.564212 252.091247 203 246 203 225 203 218.908753 203"
          ></polygon>
        </g>
      </g>
    </svg>
    <span class="help-text">{{helpText}}</span>
  </div>
</template>

<style scoped>
.slidecontainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.help-text {
  margin-top: 10px;
  color: #979797;
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
  margin-bottom: 10px;
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
