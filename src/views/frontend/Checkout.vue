<template>
  <loading :active="isLoading.status"></loading>
  <div class="container my-5">
    <div class="row">
      <!-- 購物流程 -->
      <div class="col-9 mx-auto">
        <section class="position-relative mb-5 pb-5">
          <div class="progress" style="height: 1px;">
            <div class="progress-bar" role="progressbar" style="width: 0%;"
            aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <button type="button"
            class="position-absolute top-0 start-0 translate-middle btn btn-primary rounded-pill"
            style="width: 2rem; height:2rem;">
          </button>
          <p class="position-absolute top-0 start-0 translate-middle mt-4 pt-2">確認商品</p>
          <button type="button"
            class="position-absolute top-0 start-50 translate-middle btn btn-secondary rounded-pill"
            style="width: 2rem; height:2rem;">
          </button>
          <p class="position-absolute top-0 start-50 translate-middle mt-4 pt-2">填寫資料</p>
          <button type="button"
          class="position-absolute top-0 start-100 translate-middle btn btn-secondary rounded-pill"
            style="width: 2rem; height:2rem;">
          </button>
          <p class="position-absolute top-0 start-100 translate-middle text-nowrap mt-4
          pt-2">結賬</p>
        </section>
      </div>
      <!-- 購物車列表 -->
      <div class="col-lg-9 mx-auto">
        <section class="studio__checkout" v-if="cartsData.carts[0]">
          <h2 class="text-center fw-bolder mb-3 mb-md-4 mb-lg-5">購物車列表</h2>
          <ul class="list-group">
            <li class="list-group-item" v-for="item in cartsData.carts" :key="item.id">
              <div class="d-flex align-items-center">
                <!-- 刪除單一產品 -->
                <input type="button" value="X"
                class="btn btn-link btn-sm text-decoration-none link-secondary me-2"
                @click="deleteCart(item.id)">
                <!-- 產品圖片 -->
                <router-link :to="`/product/${item.product.id}`" class="link-dark">
                  <img :src="item.product.imageUrl" :alt="item.title" class="rounded me-3">
                </router-link>
                <!-- 數量增減群組與小計 -->
                <div class="ms-auto">
                  <!-- 產品名稱 -->
                  <router-link :to="`/product/${item.product.id}`" class="link-dark">
                    {{item.product.title}}
                  </router-link>
                  <!-- 單價 -->
                  <p class="mb-0">單價：{{'$' + item.product.price}}</p>
                  <!-- 小計 -->
                  <p class="text-end mb-0">小計：{{'$'+item.total}}</p>
                  <div class="spinner-border spinner-border-sm text-danger me-3 ms-auto"
                    role="status" v-if="isLoading.itemID === item.id">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <!-- 數量增減 -->
                  <div class="input-group" v-else>
                    <button class="btn btn-outline-primary border-secondary" type="button"
                      @click="putCart(item, item.qty -1 )"
                      :disabled="item.qty - 1 === 0"> - </button>
                    <input type="text" class="form-control text-center bg-white"
                      placeholder="" :value="item.qty" disabled>
                    <button class="btn btn-outline-primary border-secondary" type="button"
                      @click="putCart(item, item.qty + 1)"> + </button>
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex">
                <button type="button" class="btn btn-link link-secondary ps-0"
                @click="deleteCartAll">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                  class="bi bi-cart-x" viewBox="0 0 16 16">
                    <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0
                    .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5
                    0 0 0-.708-.708L8.5 6.793 7.354 5.646z"/>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2
                    0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0
                    .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915
                    10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0
                    1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </button>
                <div class="ms-auto">
                  <p class="mb-0 d-flex">商品合計：
                    <span class="ms-auto">{{'$' + cartsData.total}}</span>
                  </p>
                  <p class="mb-0 d-flex">訂單總計：
                    <span class="ms-auto text-danger">
                      {{'$' + Math.floor(cartsData.final_total)}}
                    </span>
                  </p>
                  <p>
                    {{cartsData.total !== cartsData.final_total ? '已套用優惠券' : '未使用優惠券'}}
                  </p>
                </div>
              </div>
              <div class="input-group w-50 ms-auto mb-3">
                <input type="text" class="form-control text-danger"
                  placeholder="請輸入優惠券代碼" v-model="couponCode">
                <button class="btn btn-outline-secondary" type="button"
                  @click="postCoupon">套用</button>
              </div>
              <router-link to="/CheckoutInfo"
                class="btn btn-primary text-white w-100">填寫資料</router-link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartsData: {
        carts: [],
      },
      isSubmitOrder: false,
      couponCode: 'test777',
      deleteList: [],
    };
  },
  emits: ['update'],
  props: ['cartsUpdate'],
  methods: {
    getCartsList() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading.status = true;
      this.axios.get(apiUrl).then((res) => {
        this.isLoading.status = false;
        if (res.data.success) {
          this.cartsData = res.data.data;
          if (!this.cartsData.carts.length && !this.isSubmitOrder) {
            this.$router.replace('/productsList');
          }
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('取得購物車清單有問題喔～快去看什麼問題吧！', 'error');
      });
    },
    putCart(item, num) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const productData = { data: { product_id: item.product_id, qty: num } };
      this.isLoading.itemID = item.id;
      this.axios.put(apiUrl, productData).then((res) => {
        if (res.data.success) {
          this.isLoading.itemID = '';
          this.$emit('update');
          this.getCartsList();
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法更新資料喔～', 'error');
      });
    },
    deleteCart(itemID) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${itemID}`;
      this.isLoading.itemID = itemID;
      this.axios.delete(apiUrl).then((res) => {
        if (res.data.success) {
          this.$emit('update');
          this.getCartsList();
          this.swal('已刪除購物車商品囉！');
        } else {
          this.swal(res.data.message);
        }
        this.isLoading.itemID = '';
      }).catch(() => {
        this.swal('無法刪除購物車內商品喔～', 'error');
      });
    },
    deleteCartAll() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.axios.delete(apiUrl).then((res) => {
        if (res.data.success) {
          this.swal('已無商品囉！');
          this.$emit('update');
          this.getCartsList();
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法刪除購物車內商品喔～', 'error');
      });
    },
    postCoupon() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      this.axios.post(apiUrl, { data: { code: this.couponCode } }).then((res) => {
        if (res.data.success) {
          this.swal(res.data.message);
          this.getCartsList();
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法套用優惠券喔～', 'error');
      });
    },
    postOrder() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      this.axios.post(apiUrl, { data: this.order }).then((res) => {
        if (res.data.success) {
          this.isSubmitOrder = true;
          this.swal('感謝您的選購，還請確認付款資訊，謝謝。');
          this.$refs.orderForm.resetForm();
          this.$emit('update');
          setTimeout(() => {
            this.$router.replace(`/order/${res.data.orderId}`);
          }, 2000);
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法送出訂單喔～', 'error');
      });
    },
  },
  created() {
    this.getCartsList();
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
