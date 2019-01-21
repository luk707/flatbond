import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import CreateFlatbond from "./pages/CreateFlatbond.vue";
import FlatbondDetails from "./pages/FlatbondDetails.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    { path: "/", component: CreateFlatbond },
    { path: "/details", component: FlatbondDetails }
  ]
});

export default new Vue({
  router,
  el: "#root",
  render: h => h(App)
});
