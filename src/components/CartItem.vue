<!-- eslint-disable vuejs-accessibility/form-control-has-label -->

<template>
  <li class="cart__item product">
    <div class="product__pic">
      <picture>
        <source type="image/webp" :srcset="item.product.webp" />
        <img
          width="120"
          height="120"
          type="image/jpeg"
          :src="item.basketItemGallery.url"
          :alt="item.product.title"
        />
      </picture>
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>
    <div class="product__info product__info--size">
      <span>Размер: </span>
      <span>{{ item.basketItemSize.title }}</span>
    </div>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i
          :style="{ background: item.basketItemColor.code }"
          :class="{ colorborder: item.basketItemColor.code === '#ffffff' }"
        ></i>
        {{ item.basketItemColor.title }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.productId }} </span>

    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        @click="
          if (amount > 1) {
            amount--;
          }
        "
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count" />

      <button type="button" aria-label="Добавить один товар" @click="amount++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId, item.basketItemId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  filters: {
    numberFormat,
  },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
          basketItemId: this.item.basketItemId,
        });
      },
    },
  },
  methods: {
    ...mapActions(['deleteCartProduct']),
    deleteProduct() {
      this.deleteCartProduct(this.item.basketItemId);
    },
  },
};
</script>

<style>
.product__info--size {
  grid-row: 1/3;
}
.product__del {
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.product__del:hover {
  background-color: rgb(255, 241, 241);
  border-radius: 10px;
}
</style>
