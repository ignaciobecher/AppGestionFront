import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: ()=> import('../views/mainView.vue')
    },
    {
      path:'/sales',
      component:()=>import ('../pages/salesPage.vue')
    },
    {
      path:'/stock',
      component:()=>import('../pages/stockView.vue')
    },
    {
      path:'/resume',
      component:()=>import ('../pages/resumePage.vue')
    },
    {
      path:'/buys',
      component:()=> import ('../pages/buysPage.vue')
    },
    {
      path:'/expenses',
      component:()=>import ('../pages/expensesPage.vue')
    },
    {
      path:'/sales/resume',
      component:()=>import ('../pages/salesResume.vue')
    },
    {
      path:'/dashboard',
      component:()=> import ('../views/dashboardView.vue')
    }
    
  ]
})

export default router
