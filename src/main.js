import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import router from "./router";
import App from "./App";
import VLink from "./components/VLink";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.component("VLink", VLink);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
