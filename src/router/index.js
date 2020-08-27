import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // Frontend
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
      },
    ],
  },
  // Login
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  // Backend
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'storage',
        component: () => import('../views/backend/Storage.vue'),
      },
    ],
  },
  // Error Page
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
