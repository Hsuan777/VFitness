<template>
  <section>
    <!-- 我的最愛 banner -->
    <figure
      class="studio__banner studio__banner__secondary studio__banner__bookMark
          d-flex justify-content-center align-items-center mb-5"
    >
      <h2 class="studio__banner__title text-white fw-bolder p-4 rounded d-inline">我的最愛</h2>
    </figure>
    <!-- 我的最愛內容 -->
    <div class="container mb-5">
      <!-- 無資料，額外產品-->
      <div v-if="!localStorageData[0]">
        <p class="h3">還沒有最愛喔，您可能也會有興趣 :</p>
        <ul class="list-unstyled row g-1 row-cols-2 row-cols-md-4 mb-5">
          <li class="product--hover col" v-for="item in randomData" :key="item.id">
            <div class="card card-body border-0">
              <router-link
                :to="`/product/${item.id}`"
                class="text-decoration-none link-dark stretched-link"
              >
                <img
                  :src="item.imageUrl"
                  alt="item.title"
                  class="product__list__img mb-2 rounded-3"
                />
              </router-link>
              <h3 class="h4 text-truncate mb-0">{{ item.title }}</h3>
            </div>
          </li>
        </ul>
        <div class="row">
          <div class="col d-flex justify-content-center">
            <router-link
              to="/productsList"
              class="btn btn-primary btn-lg text-white"
              >前往看更多~</router-link
            >
          </div>
        </div>
      </div>
      <!-- 有資料 -->
      <ul v-else class="list-unstyled row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
        <li class="product--hover col" v-for="item in finalDisplayData" :key="item.id">
          <div class="card card-body border-0">
            <!-- 產品圖片 -->
            <img :src="item.imageUrl" alt="item.title" class="product__list__img mb-2 rounded-3" />
            <!-- 產品標題 -->
            <h3 class="h4 mb-0">
              <router-link
                :to="`/product/${item.id}`"
                class="text-decoration-none text-dark d-block text-truncate stretched-link"
              >
                {{ item.title }}
              </router-link>
            </h3>
            <!-- 價格與購物車 -->
            <div class="d-flex justify-content-between align-items-center my-2 pb-2 border-bottom">
              <!-- 我的最愛按鈕 -->
              <button
                type="button"
                class="product__list__functionBtn btn btn-link link-primary text-decoration-none
                  d-flex align-items-center ps-0"
                @click="setLocalStorage(item)"
              >
                <span class="material-icons">
                  {{
                    this.localStorageData.some((obj) => obj.id === item.id)
                      ? 'bookmark'
                      : 'bookmark_border'
                  }}
                </span>
              </button>
              <!-- 價格 -->
              <p class="display-7 mb-0">{{ $filters.currency(item.price) }}</p>
              <!-- 讀取效果 -->
              <button
                type="button"
                class="btn btn-link link-dark ps-1"
                v-if="isLoading.itemID === item.id"
              >
                <div class="spinner-border spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
              <!-- 購物車按鈕 -->
              <button
                type="button"
                class="product__list__functionBtn btn btn-link p-2"
                @click="addCart(item)"
                v-else-if="!checkCartsData(item.id)"
              >
                <img
                  src="../../assets/images/bi-cart-plus.svg"
                  alt="addCart"
                  class="studio__icon"
                />
              </button>
              <!-- 為了排版等高 -->
              <button type="button" class="btn btn-link link-dark p-2" v-else>
                <img
                  src="../../assets/images/bi-cart-check.svg"
                  alt="checkCart"
                  class="studio__icon"
                />
              </button>
            </div>
            <!-- 商品描述 -->
            <p class="mb-0">{{ item.description }}</p>
          </div>
        </li>
      </ul>
      <div class="d-flex justify-content-center mb-5">
        <page
          :pages="totalPages"
          :currentPage="currentPage"
          @display-page="changeDisplayData"
        ></page>
      </div>
    </div>
    <toast ref="toast"></toast>
    <subscribe></subscribe>
  </section>
</template>

<script>
import subscribe from '../../components/frontend/Subscribe.vue';

export default {
  data() {
    return {
      localStorageData: [],
      cartsData: [],
      products: [],
      randomData: [],
      totalPages: 0,
      currentPage: 1,
      finalDisplayData: [],
    };
  },
  props: ['cartsUpdate'],
  methods: {
    getProductsAll() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.randomProduct();
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法取得商品全部資料喔!', 'error');
        });
    },
    setLocalStorage(item) {
      this.localStorageData.forEach((element, index) => {
        if (element.id === item.id) {
          this.localStorageData.splice(index, 1);
          localStorage.setItem('myFavorite', JSON.stringify(this.localStorageData));
          this.$emit('update');
          this.changeDisplayData(this.currentPage);
          this.$refs.toast.showToast(`『${item.title}』，已從我的最愛移除囉!`, 'error');
        }
      });
    },
    getCartsList() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.cartsData = res.data.data.carts;
          } else {
            this.$refs.toast.showToast('無法取得購物車清單喔!', 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法取得購物車清單喔!', 'error');
        });
    },
    addCart(item) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const productData = { data: { product_id: item.id, qty: 1 } };
      this.isLoading.itemID = item.id;
      this.axios
        .post(apiUrl, productData)
        .then((res) => {
          if (res.data.success) {
            this.isLoading.itemID = '';
            this.$emit('update');
            this.getCartsList();
            this.$refs.toast.showToast(`『${item.title}』${res.data.message}`);
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast(`無法將『${item.title}』加入購物車喔!`, 'error');
        });
    },
    checkCartsData(id) {
      const tempData = this.cartsData.filter((item) => item.product_id === id);
      let isExist = false;
      if (tempData[0]) {
        isExist = true;
      }
      return isExist;
    },
    changeDisplayData(page = 1) {
      const n = 12;
      this.totalPages = Math.ceil(this.localStorageData.length / n);
      this.currentPage = page;
      this.finalDisplayData = this.localStorageData.slice(n * page - n, n * page);
      // 若當前頁面已無資料，頁數減一
      if (this.localStorageData.length > 1 && this.finalDisplayData.length === 0) {
        this.currentPage -= 1;
        this.changeDisplayData(this.currentPage);
      }
    },
    randomNumber(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomProduct() {
      const tempData = this.products;
      this.randomData = [];
      for (let x = 0; x < 4; x += 1) {
        const y = this.randomNumber(tempData.length, 0);
        this.randomData.push(this.products[y]);
        tempData.splice(y, 1);
      }
    },
  },
  created() {
    this.getCartsList();
    this.getProductsAll();
  },
  mounted() {
    this.localStorageData = JSON.parse(localStorage.getItem('myFavorite')) || [];
    this.changeDisplayData();
  },
  components: {
    subscribe,
  },
  watch: {
    cartsUpdate(value) {
      if (value) {
        this.getCartsList();
      }
    },
  },
};
</script>
