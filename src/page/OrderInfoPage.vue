<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html"> Корзина </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value"> {{ order.phone }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value"> {{ order.email }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> {{ order.paymentType }} </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li
              class="cart__order"
              v-for="orderItem in orderItems"
              :key="orderItem.id"
            >
              <h3>{{ orderItem.product.title }}</h3>
              <b>{{ orderItem.price | numberFormat }} ₽</b>
              <span>Артикул: {{ orderItem.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>
              Доставка: <b v-if="order.deliveryType.price == 0">бесплатно</b>
              <b v-if="order.deliveryType.price > 0">{{
                order.deliveryType.price
              }}</b>
            </p>
            <p>
              Итого: <b>{{ orderItems.length }}</b> товара на сумму
              <b>{{ order.totalPrice | numberFormat }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<!-- eslint-disable operator-linebreak -->

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  computed: {
    order() {
      return this.$store.state.orderInfo;
    },
    orderItems() {
      return this.$store.state.orderInfo
        ? this.$store.state.orderInfo.basket.items
        : [];
    },
  },
  filters: { numberFormat },
  created() {
    if (
      this.$store.state.orderInfo &&
      this.$store.state.orderInfo.id === this.$route.params.id
    ) {
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
};
</script>
