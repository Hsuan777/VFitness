<template>
  <section class="product__list container my-5">
    <h2 class="text-center fw-bolder mb-5">我的最愛</h2>
    <router-link v-if="!localStorageData[0]" to="/productsList"
      class="btn btn-primary text-white w-50 d-block mx-auto">還沒有最愛喔！前往選購～</router-link>
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
              @click="addCart(item.id)" v-else-if="!checkCartsData(item.id)">
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
            <router-link :to="`/product/${item.id}`" class="btn btn-link link-dark p-0" v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart-check mx-2" viewBox="0 0 16 16">
                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0
                  1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4
                  12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0
                  0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915
                  10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1
                  1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
            </router-link>
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
      cartsData: [],
    };
  },
  emits: ['update'],
  props: ['cartsUpdate'],
  methods: {
    setLocalStorage(item) {
      if (this.localStorageData[0]) {
        // 若使用 indexOf 可能會遇到物件傳參考問題，改用其他方式
        let dataIndex = null;
        this.localStorageData.forEach((element, index) => {
          if (element.id === item.id) {
            dataIndex = index;
          }
        });
        if (dataIndex === null) {
          this.localStorageData.push(item);
          localStorage.setItem('myFavorite', JSON.stringify(this.localStorageData));
          // 更新 Layout nav 資料
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
    getCartsList() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          this.cartsData = res.data.data.carts;
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法取得購物車清單喔～', 'error');
      });
    },
    addCart(itemID) {
      this.isLoading.itemID = itemID;
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const productData = { data: { product_id: itemID, qty: 1 } };
      this.axios.post(apiUrl, productData).then((res) => {
        if (res.data.success) {
          this.isLoading.itemID = '';
          // 觸發父層元件之函式，但在這得先定義 emits
          this.$emit('update');
          this.getCartsList();
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法加入購物車喔～', 'error');
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
  },
  created() {
    this.getCartsList();
  },
  mounted() {
    this.localStorageData = JSON.parse(localStorage.getItem('myFavorite')) || [];
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
