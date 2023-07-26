/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,

    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(
        (item) => item.productId === productId
      );
      if (item) {
        item.amount = amount;
      }
    },

    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },

    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
        basketItemId: item.id,
        basketItemColor: item.color.color,
        basketItemGallery: item.color.gallery['0'].file,
        basketItemSize: item.size,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find(
          (p) => p.product.id === item.productId
        );
        return {
          ...item,
          product: {
            ...product,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0
      );
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: { userAccessKey: context.state.userAccessKey },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: { userAccessKey: context.state.userAccessKey },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productId, amount, colorId, sizeId }) {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
        axios
          .post(
            `${API_BASE_URL}/api/baskets/products`,
            {
              productId,
              quantity: amount,
              colorId,
              sizeId,
            },
            {
              params: { userAccessKey: context.state.userAccessKey },
            }
          )
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          })
      );
    },
    updateCartProductAmount(context, { productId, amount, basketItemId }) {
      context.commit('updateCartProductAmount', { productId, amount });
      if (amount < 1) {
        return;
      }
      return axios
        .put(
          `${API_BASE_URL}/api/baskets/products`,
          {
            basketItemId,
            quantity: amount,
          },
          {
            params: { userAccessKey: context.state.userAccessKey },
          }
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, basketItemId) {
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          data: { basketItemId },
          params: { userAccessKey: context.state.userAccessKey },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});
