<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ countProducts }} товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
        :collection-id.sync="filterCollectionId"
        :material-id.sync="filterMaterialId"
      />
      <section class="catalog">
        <div v-if="productsloading">Загрузка товара...</div>
        <div class="preloader-5" v-if="productsloading"></div>
        <div v-if="productsloadingFailed">
          Произошла ошибка при загрузке товаров
        </div>

        <ProductList :products="products" />

        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable array-callback-return -->
<!-- eslint-disable no-param-reassign -->
<!-- eslint-disable no-return-assign -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<!-- eslint-disable comma-dangle -->

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      filterMaterialId: [],
      filterCollectionId: [],

      page: 1,
      productsPerPage: 9,

      productsDate: null,

      productsloading: false,
      productsloadingFailed: false,
    };
  },
  computed: {
    products() {
      const productsNew = [];
      if (this.productsDate) {
        this.productsDate.items.map((product) => {
          if (product.colors['0'].gallery) {
            product.jpg = product.colors['0'].gallery['0'].file.url;
            productsNew.push(product);
          } else if (product.colors['1'].gallery) {
            product.jpg = product.colors['1'].gallery['0'].file.url;
            productsNew.push(product);
          }
        });
      } else {
        [];
      }
      return productsNew;
    },

    countProducts() {
      return this.productsDate ? this.productsDate.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsloading = true;
      this.productsloadingFailed = false;
      const materialId = [];
      const collectionId = [];
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorIds: this.filterColorId,
              materialIds: materialId.concat(this.filterMaterialId),
              seasonIds: collectionId.concat(this.filterCollectionId),
            },
          })
          .then((response) => (this.productsDate = response.data))
          .catch(() => (this.productsloadingFailed = true))
          .then(() => (this.productsloading = false));
      }, 500);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
    filterCollectionId() {
      this.loadProducts();
    },
    filterMaterialId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style>
.preloader-5 {
  display: block;
  position: relative;
  width: 150px;
  height: 150px;
  margin: 30px auto;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #337ab7;
  animation: preloader-5-spin 2s linear infinite;
}
.preloader-5:before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #bfe2ff;
  animation: preloader-5-spin 3s linear infinite;
}
.preloader-5:after {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #337ab7;
  animation: preloader-5-spin 1.5s linear infinite;
}
@keyframes preloader-5-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
