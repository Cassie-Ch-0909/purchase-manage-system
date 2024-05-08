import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/layout/Index.vue";
import Login from "../views/login/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

export default router;
