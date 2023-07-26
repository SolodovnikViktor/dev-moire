/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/page/MainPage';
import NotFoundPage from '@/page/NotFoundPage';
import ProductPage from '@/page/ProductPage';
import CartPage from '@/page/CartPage';
import OrderPage from '@/page/OrderPage';
import OrderInfoPage from '@/page/OrderInfoPage';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/',
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart',
  },
  {
    name: 'order',
    component: OrderPage,
    path: '/order',
  },
  {
    name: 'orderInfo',
    component: OrderInfoPage,
    path: '/order/:id',
  },
  {
    name: 'notFaund',
    component: NotFoundPage,
    path: '*',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
