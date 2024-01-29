import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/dashboardView.vue"),
    },
    {
      path:"/dayMovements",
      component:()=>import ('../components/testComponents/businessDayMovementsTest.vue')
    }
   
  ],
});

export default router;
