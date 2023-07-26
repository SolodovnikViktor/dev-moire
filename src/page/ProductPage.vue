<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <main class="content container" v-if="productLoading">
    Загрузка товара...
  </main>
  <main class="content container" v-else-if="!productData">
    Не удалось загрузить товар
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            type="image/jpeg"
            :src="imgUrl"
            :alt="product.title"
          />
        </div>
        <ul class="pics__list">
          <li class="pics__item"></li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addToCart"
          >
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button
                  type="button"
                  aria-label="Убрать один товар"
                  @click="
                    if (productAmount > 1) {
                      productAmount--;
                    }
                  "
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount" />

                <button
                  type="button"
                  aria-label="Добавить один товар"
                  @click="productAmount++"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li
                    class="colors__item"
                    v-for="color in product.colors"
                    :key="color.id"
                  >
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        :value="color.color.id"
                        v-model.number="currentColorId"
                        @click="imgColor(color.gallery[0].file.url)"
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
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label
                  class="form__label form__label--small form__label--select"
                >
                  <select
                    class="form__select"
                    type="text"
                    name="category"
                    v-model.number="currentSizeId"
                  >
                    <option
                      :value="size.id"
                      v-for="size in product.sizes"
                      :key="size.id"
                    >
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button
              class="item__button button button--primery"
              type="submit"
              :disabled="productAddSending"
            >
              В корзину
            </button>
          </form>
          <div v-show="productAdded">Товар добавлен в корзину</div>
          <div v-show="productAddSending">Добавляем товар в корзину...</div>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Информация о товаре </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Доставка и возврат </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br />
            30% полиэстер<br />
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br />
            Гладить при макс. 110ºC<br />
            Не использовать машинную сушку<br />
            Отбеливать запрещено<br />
            Не подвергать химчистке<br />
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<!-- eslint-disable no-return-assign -->
<!-- eslint-disable import/no-extraneous-dependencies -->

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      productAmount: 1,
      productData: null,

      currentSizeId: 0,
      currentColorId: 0,
      imgUrl: 0,

      productAdded: false,
      productAddSending: false,
      productLoading: false,
      productLoadingFailed: false,
    };
  },
  filters: { numberFormat },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    gotoPage,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({
        productId: this.product.id,
        amount: this.productAmount,
        sizeId: this.currentSizeId,
        colorId: this.currentColorId,
      }).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => (this.productData = response.data))
        .then(() => this.imgColor())
        .catch(() => (this.productLoadingFailed = true))
        .then(() => (this.productLoading = false));
    },
    imgColor(url) {
      if (url) {
        this.imgUrl = url;
      } else if (this.productData.colors['0'].gallery) {
        this.imgUrl = this.productData.colors['0'].gallery['0'].file.url;
      } else {
        this.imgUrl = this.productData.colors['1'].gallery['0'].file.url;
      }
      this.currentSizeId = this.productData.sizes['0'].id;
      this.currentColorId = this.productData.colors['0'].color.id;
    },
  },

  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style>
.colorborder {
  border: 1px solid #939393;
}
.form__select {
  cursor: pointer;
}
.form__select:hover {
  border: 1px solid #939393;
}
</style>
