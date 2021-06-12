import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // 前台路由
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/frontend/Home.vue'),
      },
      {
        path: 'productsList',
        name: 'ProductsList',
        component: () => import('../views/frontend/ProductsList.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('../views/frontend/Test.vue'),
      },
    ],
  },
  // 登入
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/backend/Signin.vue'),
  },
  // 後台路由
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      // 404 訊息
      {
        path: ':pathMatch(.*)*',
        component: () => import('../views/NotFound.vue'),
      },
    ],
  },
  // 重新導向
  {
    path: '/:pathMatch(.*)*',
    // component: () => import('../views/NotFound.vue'),
    redirect: {
      name: 'Home',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
