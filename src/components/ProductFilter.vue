<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <aside class="filter">
    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors colors--black">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                :value="color.id"
                v-model.number="currentColorId"
              />
              <span
                :style="{ background: color.code }"
                class="colors__value"
                :class="{ colorborder: color.code === '#ffffff' }"
              >
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="material in materials"
            :key="material.id"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="radio"
                name="material"
                :value="material.id"
                v-model.number="currentMaterialId"
              />
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="collection in сollections"
            :key="collection.id"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="radio"
                name="collection"
                :value="collection.id"
                v-model.number="currentCollectionId"
              />
              <span class="check-list__desc">
                {{ collection.title }}
                <span>({{ collection.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click="reset"
        :disabled="btnDisable"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<!-- eslint-disable no-return-assign -->

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      currentMaterialId: [],
      currentCollectionId: [],

      categoriesData: null,
      colorsData: null,
      materialsData: null,
      seasonsData: null,

      btnDisable: true,
    };
  },
  props: [
    'priceFrom',
    'priceTo',
    'categoryId',
    'colorId',
    'collectionId',
    'materialId',
  ],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    materials() {
      return this.materialsData ? this.materialsData.items : [];
    },
    сollections() {
      return this.seasonsData ? this.seasonsData.items : [];
    },
  },
  watch: {
    currentPriceFrom(value) {
      value >= 1 ? (this.btnDisable = false) : (this.btnDisable = true);
    },
    currentPriceTo(value) {
      value >= 1 ? (this.btnDisable = false) : (this.btnDisable = true);
    },
    currentCategoryId(value) {
      value >= 1 ? (this.btnDisable = false) : (this.btnDisable = true);
    },
    currentColorId(value) {
      value >= 1 ? (this.btnDisable = false) : (this.btnDisable = true);
    },
    currentMaterialId(value) {
      value >= 1 ? (this.btnDisable = false) : (this.btnDisable = true);
    },
    currentCollectionId(value) {
      value >= 1 ? (this.btnDisable = false) : (this.btnDisable = true);
    },
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
    collectionId(value) {
      this.currentCollectionId = value;
    },
    materialId(value) {
      this.currentMaterialId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
      this.$emit('update:collectionId', this.currentCollectionId);
      this.$emit('update:materialId', this.currentMaterialId);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', null);
      this.$emit('update:materialId', null);
      this.$emit('update:collectionId', null);
    },
    loadCategories() {
      axios
        .get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => (this.categoriesData = response.data));
    },
    loadColors() {
      axios
        .get(`${API_BASE_URL}/api/colors`)
        .then((response) => (this.colorsData = response.data));
    },
    loadMaterials() {
      axios
        .get(`${API_BASE_URL}/api/materials`)
        .then((response) => (this.materialsData = response.data));
    },
    loadSeasons() {
      axios
        .get(`${API_BASE_URL}/api/seasons`)
        .then((response) => (this.seasonsData = response.data));
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
    this.loadMaterials();
    this.loadSeasons();
  },
};
</script>

<style>
.colorborder {
  border: 1px solid #939393;
}
</style>
