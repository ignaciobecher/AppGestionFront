import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/dashboardView.vue"),
    },
    {
      path: "/chartTest",
      component: () => import("../components/testComponents/chartTest.vue"),
    },
    {
      path: "/monthTest",
      component: () =>
        import("../components/testComponents/chartByMonthTest.vue"),
    },
  ],
});

export default router;
