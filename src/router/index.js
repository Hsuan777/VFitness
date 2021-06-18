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
        path: 'about',
        name: 'About',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'productsList',
        name: 'ProductsList',
        component: () => import('../views/frontend/ProductsList.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      {
        path: 'order/:id',
        name: 'Order',
        component: () => import('../views/frontend/Order.vue'),
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
        path: 'products',
        name: 'Products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import('../views/backend/Articles.vue'),
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
    redirect: {
      name: 'Home',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
