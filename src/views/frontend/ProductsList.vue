<template>
  <loading :active="isLoading.status"></loading>
  <update-carts :is-update-data="isUpdate"></update-carts>
  <!-- 商品頁籤 -->
  <nav class="custom__categoryTab container-fluid mb-lg-3 bg-white">
    <div class="container">
      <ul class="nav row justify-content-around">
        <li class="custom__select col text-center border-end py-lg-2">
          <a class="nav-item nav-link link-dark h3 mb-0" href="#">
            <i class="fas fa-utensils text-primary me-3"></i>餐飲</a>
        </li>
        <li class="custom__select col text-center py-lg-2">
          <a class="nav-item nav-link link-dark h3 mb-0" href="#">
            <i class="fas fa-dumbbell text-danger me-3"></i>課程</a>
        </li>
      </ul>
    </div>
  </nav>
  <!-- 商品列表 -->
  <div class="container">
    <ul class="list-unstyled row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
      <li class="custom__select col" v-for="item in products" :key="item.id">
        <div class="card card-body border-0">
          <a :href="'product.html?id=' + item.id" class="text-decoration-none link-dark">
            <img :src="item.imageUrl" alt="item.title"
            class="custom__product__img mb-2 rounded-3 w-100">
          </a>
          <h3 class="h4 mb-0"><a href="'product.html?id=' + item.id"
          class="text-decoration-none text-dark">{{item.title}}</a></h3>
          <div class="d-flex align-items-center my-2 pb-2 border-bottom">
            <p class="h4 mb-0 text-danger">{{item.price}}</p>
            <div class="spinner-border spinner-border-sm text-danger ms-auto me-3"
            role="status" v-if="isLoading.itemID === item.id">
              <span class="visually-hidden">Loading...</span>
            </div>
            <button type="button" class="btn btn-link ms-auto p-0" @click="addCart(item.id)" v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              fill="currentColor" class="bi bi-cart-plus text-dark mx-2" viewBox="0 0 16 16">
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
          <p>{{item.description}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import updateCarts from '../../components/updateCarts.vue';

export default {
  data() {
    return {
      isLoading: {
        itemID: '',
        status: false,
      },
      products: {},
      isUpdate: '',
    };
  },
  methods: {
    getProductsAll() {
      this.isLoading.status = true;
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios.get(apiUrl).then((res) => {
        this.isLoading.status = false;
        if (res.data.success) {
          this.products = res.data.products;
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('無法取得資料喔～快去看什麼問題吧！');
      });
    },
    getCartsList() {
      // console.log(document.getElementById('carts').getCartsList());
      // const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      // this.axios.get(apiUrl).then((res) => {
      //   if (res.data.success) {
      //     this.cartsData = res.data.data;
      //     this.$emit('push-total', this.cartCount);
      //   } else {
      //     this.swal(res.data.message);
      //   }
      // }).catch(() => {
      //   this.swal('無法取得資料喔～快去看什麼問題吧！');
      // });
    },
    addCart(itemID) {
      this.isLoading.itemID = itemID;
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const productData = { data: { product_id: itemID, qty: 1 } };
      this.axios.post(apiUrl, productData).then((res) => {
        if (res.data.success) {
          this.isLoading.itemID = '';
          // this.isUpdate = 'true';
          // console.log(document.getElementById('carts').getCartsList());
          // this.getCartList();
          console.log(this.$refs);
        } else {
          this.swal(res.data.message);
        }
        this.isUpdate = '';
      }).catch((res) => {
        this.swal('無法取得資料喔～快去看什麼問題吧！');
        console.log(res);
      });
    },
    swal(msg) {
      this.$swal.fire({
        position: 'bottom-end',
        title: msg,
        width: 'auto',
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },
  created() {
    this.getProductsAll();
  },
  components: {
    updateCarts,
  },
  mounted() {
    console.log(this.$refs);
  },
};
</script>
