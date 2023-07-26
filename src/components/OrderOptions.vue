<!-- eslint-disable no-return-assign -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="cart__options">
    <h3 class="cart__title">Доставка</h3>
    <ul class="cart__options options">
      <li
        class="options__item"
        v-for="deliverie in deliveries"
        :key="deliverie.id"
      >
        <label class="options__label">
          <input
            class="options__radio sr-only"
            type="radio"
            name="delivery"
            :value="deliverie.id"
            v-model.number="currentDeliveryId"
          />
          <span class="options__value">
            {{ deliverie.title }}
            <b v-if="deliverie.price === '0'">: бесплатно</b>
            <b v-if="deliverie.price > 0"
              >: {{ deliverie.price | numberFormat }} руб</b
            >
          </span>
        </label>
      </li>
    </ul>
    <h3 class="cart__title">Оплата</h3>
    <ul class="cart__options options">
      <li class="options__item" v-for="payment in payments" :key="payment.id">
        <label class="options__label">
          <input
            class="options__radio sr-only"
            type="radio"
            name="pay"
            :value="payment.id"
            v-model.number="currentPaymentsId"
          />
          <span class="options__value"> {{ payment.title }} </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<!-- eslint-disable no-return-assign -->

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      deliveriesData: null,
      payData: null,

      currentDeliveryId: 1,
      currentPaymentsId: 1,
    };
  },
  filters: { numberFormat },
  props: ['deliverieId', 'paymentId'],
  computed: {
    deliveries() {
      return this.deliveriesData ? this.deliveriesData : [];
    },
    payments() {
      return this.payData ? this.payData : [];
    },
  },
  methods: {
    loadeDelivery() {
      axios
        .get(`${API_BASE_URL}/api/deliveries`)
        .then((response) => (this.deliveriesData = response.data));
    },
    loadePay(payId) {
      axios
        .get(`${API_BASE_URL}/api/payments`, {
          params: { deliveryTypeId: payId },
        })
        .then((response) => (this.payData = response.data));
    },
    currentId() {
      this.$emit('update:deliverieId', this.currentDeliveryId);
      this.$emit('update:paymentId', this.currentPaymentsId);
      this.$emit('update:deliveriesData', this.deliveriesData);
    },
  },
  watch: {
    currentDeliveryId() {
      this.currentId();
    },
    currentPaymentsId() {
      this.currentId();
    },
  },
  created() {
    this.loadeDelivery();
    this.loadePay(this.currentPaymentsId);
    this.currentId();
  },
};
</script>
