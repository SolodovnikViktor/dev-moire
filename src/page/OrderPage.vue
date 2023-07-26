<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
        @submit.prevent="order"
      >
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model="formData.name"
              :error="formError.name"
              title="ФИО"
              type="text"
              placeholder="Введите ваше полное имя"
            />
            <BaseFormText
              v-model="formData.address"
              :error="formError.address"
              type="text"
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
            />
            <BaseFormText
              v-model="formData.phone"
              :error="formError.phone"
              type="tel"
              title="Телефон"
              placeholder="Введите ваш телефон"
            />
            <BaseFormText
              class="form__label"
              v-model="formData.email"
              :error="formError.email"
              type="email"
              title="Email"
              placeholder="Введи ваш Email"
            />
            <BaseFormTextarea
              title="Комментарий к заказу"
              v-model="formData.comment"
              placeholder="Ваши пожелания"
              :error="formError.comment"
            />
          </div>
          <OrderOptions
            :deliverie-id.sync="optionDeliverieId"
            :payment-id.sync="optionPaymentId"
            :deliveries-data.sync="optionDeliveriesData"
          />
        </div>

        <OrderBlock
          :deliverieId="optionDeliverieId"
          :paymentId="optionPaymentId"
          :deliveriesData="optionDeliveriesData"
        />
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<!-- eslint-disable comma-dangle -->

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import OrderOptions from '@/components/OrderOptions.vue';
import OrderBlock from '@/components/OrderBlock.vue';

export default {
  components: {
    BaseFormText,
    BaseFormTextarea,
    OrderOptions,
    OrderBlock,
  },
  data() {
    return {
      formData: {},
      formError: {},
      optionDeliverieId: 1,
      optionPaymentId: 1,
      formErrorMessage: '',
      optionDeliveriesData: null,
    };
  },
  methods: {
    order() {
      this.formErrorMessage = null;
      axios
        .post(
          `${API_BASE_URL}/api/orders`,
          {
            ...this.formData,
            deliveryTypeId: this.optionDeliverieId,
            paymentTypeId: this.optionPaymentId,
          },
          { params: { userAccessKey: this.$store.state.userAccessKey } }
        )
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({
            name: 'orderInfo',
            params: { id: response.data.id },
          });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
};
</script>

<!-- ...(this.formData = {
  deliveryTypeId: this.optionDeliverieId,
  paymentTypeId: this.optionPaymentId,
}), -->
