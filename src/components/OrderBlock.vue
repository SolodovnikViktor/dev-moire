<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="product in products" :key="product.id">
        <h3>{{ product.product.title }}</h3>

        <b class="cart__price">
          <span class="cart__amount">шт: {{ product.amount }} </span>
          {{ (product.product.price * product.amount) | numberFormat }} ₽</b
        >
        <span>Артикул: {{ product.productId }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>
        Доставка: <b v-if="deliverieId == 1">бесплатно</b>
        <b v-if="deliverieId == 2"
          >{{ deliveriesData['1'].price | numberFormat }} руб</b
        >
      </p>
      <p>
        Итого: <b>{{ products.length }}</b> товара на сумму
        <b>{{ totalPrice | numberFormat }} ₽</b>
      </p>
    </div>

    <button class="cart__button button button--primery" type="submit">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['deliverieId', 'paymentId', 'deliveriesData'],
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
  },
  filters: { numberFormat },
};
</script>

<style>
.cart__amount {
  position: absolute;
  left: -20px;
  top: 8px;
}
.cart__price {
  position: relative;
}
</style>
