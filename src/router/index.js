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
    }
    
  ]
})

export default router
