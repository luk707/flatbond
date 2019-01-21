<script>
export default {
  name: "App"
};
</script>

<template>
  <div :class="$style.App">
    <router-view></router-view>
  </div>
</template>

<style module>
@import url("https://fonts.googleapis.com/css?family=Sarabun:400,600,800");

.App {
  padding: 20px;
  font-family: "Sarabun", sans-serif;
  position: relative;
  max-width: 600px;
  margin: auto;
}

button {
  font-family: "Sarabun", sans-serif;
}
</style>
