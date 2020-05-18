import Vue from "vue";
import Router from "vue-router";

import Home from "../pages/Home.vue";
import Javascript from "../pages/Javascript/Javascript.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/javascript",
      name: "Javascript",
      component: Javascript
    }
  ],
  mode: "history"
});

export default router;
