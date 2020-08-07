import Vue from "vue";
import Router from "vue-router";
import Home from "./views/index.vue";
// import store from "@/store/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      //   component: () => import("./views/index.vue"),
    },
  ],
});

export default router;
