<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <picture>
        <source type="image/webp" :srcset="product.webp" />
        <img type="image/jpeg" :src="product.jpg" :alt="product.title" />
      </picture>
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color.color.id"
          />
          <span
            class="colors__value"
            :class="{ colorborder: color.color.code === '#ffffff' }"
            :style="{ background: color.color.code }"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  filters: { numberFormat },
  methods: { gotoPage },
  props: ['product'],
};
</script>
