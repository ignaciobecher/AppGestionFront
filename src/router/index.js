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
      component:()=>import ('../components/dashboard/dayMovements/businessDayMovements.vue')
    },
    {
      path:'/missingStock',
      component:()=> import ('../components/dashboard/home/missingProducts/missingElementsComponent.vue')
    },
    {
      path:'/expirations',
      component:()=>import('../components/dashboard/home/expirationProducts/expirationDatesComponent.vue')
    },
    // {
    //   path:'/salesTest',
    //   component:()=>import('../components/testComponents/salesTest.vue')
    // },
    // {
    //   path:'/gptTest',
    //   component:()=>import('../components/testComponents/gptTest.vue')
    // }
   
  ],
});

export default router;
