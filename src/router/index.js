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
    },
    {
      path:'/missingStock',
      component:()=> import ('../components/testComponents/missingElementsComponent.vue')
    },
    {
      path:'/expirations',
      component:()=>import('../components/testComponents/expirationDatesComponent.vue')
    }
   
  ],
});

export default router;
