import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('../views/Test.vue'),
      },
    ],
  },
  {
    path: '/manage',
    name: 'Dashboard',
    component: () => import('../views/backEnd/Dashboard.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
