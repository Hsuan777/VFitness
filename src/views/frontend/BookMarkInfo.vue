<template>
  <section class="product__list container my-5">
    <h2 class="text-center fw-bolder mb-5">我的最愛</h2>
    <ul class="list-unstyled row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
      <li class="product--hover col"
        v-for="item in localStorageData" :key="item.id">
        <div class="card card-body border-0">
          <!-- 產品圖片 -->
          <router-link :to="`/product/${item.id}`" class="text-decoration-none link-dark">
            <img :src="item.imageUrl" alt="item.title"
            class="mb-2 rounded-3">
          </router-link>
          <!-- 產品標題 -->
          <h3 class="h4 mb-0">
            <router-link :to="`/product/${item.id}`" class="text-decoration-none text-dark">
              {{item.title}}
            </router-link>
          </h3>
          <!-- 價格與購物車 -->
          <div class="d-flex justify-content-between align-items-center my-2 pb-2 border-bottom">
            <!-- 我的最愛按鈕 -->
            <button type="button"
              class="btn btn-link link-primary text-decoration-none d-flex align-items-center"
              @click="setLocalStorage(item)">
              <span class="material-icons">
                {{this.localStorageData.some((obj) => obj.id === item.id)
                ? 'bookmark' : 'bookmark_border'}}
              </span>
            </button>
            <!-- 價格 -->
            <p class="display-7 mb-0">{{$filters.currency(item.price)}}</p>
            <!-- 讀取效果 -->
            <div class="spinner-border spinner-border-sm text-danger me-3"
            role="status" v-if="isLoading.itemID === item.id">
              <span class="visually-hidden">Loading...</span>
            </div>
            <!-- 購物車按鈕 -->
            <button type="button" class="btn btn-link p-0"
              @click="addCart(item.id)" v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              fill="currentColor" class="bi bi-cart-plus text-primary mx-2" viewBox="0 0 16 16">
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1
                0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4
                12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0
                .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915
                10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0
                1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
            </button>
          </div>
          <!-- 商品描述 -->
          <p class="mb-0">{{item.description}}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      localStorageData: [],
    };
  },
  methods: {
    setLocalStorage(item) {
      if (this.localStorageData[0]) {
        const dataIndex = this.localStorageData.indexOf(item);
        if (dataIndex === -1) {
          this.localStorageData.push(item);
          localStorage.setItem('myFavorite', JSON.stringify(this.localStorageData));
          this.$emit('update');
          this.swal('已加到我的最愛囉！');
        } else {
          this.localStorageData.splice(dataIndex, 1);
          localStorage.setItem('myFavorite', JSON.stringify(this.localStorageData));
          this.$emit('update');
          this.swal('已從我的最愛移除囉！');
        }
      } else {
        this.localStorageData.push(item);
        localStorage.setItem('myFavorite', JSON.stringify(this.localStorageData));
        this.$emit('update');
        this.swal('已加到我的最愛囉！');
      }
    },
  },
  mounted() {
    this.localStorageData = JSON.parse(localStorage.getItem('myFavorite')) || [];
  },
};
</script>
