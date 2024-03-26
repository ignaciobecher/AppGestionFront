import { createRouter, createWebHistory } from "vue-router";
import authGuard from "@/guards/authGuards";
import roleGuard from "@/guards/roleGuard";

const routes = [
  {
    path: "/",
    component: ()=>import ('../pages/landing/landingPage.vue'),
  },
  {
    path:'/precios',
    component:()=> import ('../pages/landing/planesPage.vue')
  },
  {
    path:'/funcionalidades',
    component:()=>import ('../pages/landing/functionsPage.vue')
  },
  {
    path: "/register",
    component: () => import("../pages/registerPage.vue"),
  },
  {
    path:'/pagar',
    component:()=> import ('../pages/pricesPage.vue')
  },
  {
    path: "/restore",
    component: () =>
      import("../components/dashboard/Auth/changePasswordComponent.vue"),
  },
  {
    path: "/home",
    component: () => import("../views/dashboardView.vue"),
    meta: { requiresAuth: true },
    beforeEnter: authGuard, // Usa el guardia para proteger esta ruta
  },
  {
    path: "/movements",
    component: () =>
      import("../components/dashboard/dayMovements/businessDayMovements.vue"),
  },
  {
    path: "/missingStock",
    component: () =>
      import(
        "../components/dashboard/home/missingProducts/missingElementsComponent.vue"
      ),
  },
  {
    path: "/expirations",
    component: () =>
      import(
        "../components/dashboard/home/expirationProducts/expirationDatesComponent.vue"
      ),
  },
  {
    path: "/business",
    component: () => import("../pages/newBusinessPage.vue"),
  },
  {
    path: "/suppliers",
    component: () =>
      import("../components/dashboard/outputs/suppliersComponent.vue"),
  },

  {
    path: "/registerUser",
    component: () =>
      import("../components/dashboard/Auth/createUserComponent.vue"),
    meta: { requiresAuth: true },
    beforeEnter: roleGuard, // Usa el guardia para proteger esta ruta
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
