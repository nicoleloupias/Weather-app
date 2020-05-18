import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import router from "./router";
import App from "./App";
import store from "./store";
import VLink from "./components/VLink";
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.component("VLink", VLink);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
