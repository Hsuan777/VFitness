<template>
  <div>
    <Loading :active="isLoading.status"/>
    <div class="container my-5">
      <div class="row">
        <!-- 購物流程 -->
        <div class="col-9 mx-auto">
          <section class="position-relative mb-5 pb-5">
            <div class="progress" style="height: 1px;">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 0%;"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <button
              type="button"
              class="position-absolute top-0 start-0 translate-middle btn btn-primary rounded-pill"
              style="width: 2rem; height:2rem;"
            ></button>
            <p class="position-absolute top-0 start-0 translate-middle mt-4 pt-2">確認商品</p>
            <button
              type="button"
              class="position-absolute top-0 start-50 translate-middle
                btn btn-secondary rounded-pill"
              style="width: 2rem; height:2rem;"
            ></button>
            <p class="position-absolute top-0 start-50 translate-middle mt-4 pt-2">填寫資料</p>
            <button
              type="button"
              class="position-absolute top-0 start-100 translate-middle
              btn btn-secondary rounded-pill"
              style="width: 2rem; height:2rem;"
            ></button>
            <p
              class="position-absolute top-0 start-100 translate-middle text-nowrap mt-4
            pt-2"
            >
              結賬
            </p>
          </section>
        </div>
        <!-- 購物車列表 -->
        <div class="col-lg-9 mx-auto">
          <section v-if="cartsData.carts[0]">
            <h2 class="text-center fw-bolder mb-3 mb-md-4 mb-lg-5">購物車列表</h2>
            <ul class="list-group">
              <li class="list-group-item py-3" v-for="item in cartsData.carts" :key="item.id">
                <div class="d-flex align-items-center">
                  <!-- 刪除單一產品 -->
                  <input
                    type="button"
                    value="X"
                    class="btn btn-link btn-sm text-decoration-none link-secondary me-2"
                    @click="deleteCart(item)"
                  />
                  <!-- 產品圖片 -->
                  <router-link :to="`/product/${item.product.id}`" class="link-dark">
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.title"
                      class="studio__checkout__img rounded me-3"
                    />
                  </router-link>
                  <!-- 數量增減群組與小計 -->
                  <div class="ms-auto">
                    <!-- 產品名稱 -->
                    <router-link :to="`/product/${item.product.id}`" class="link-dark">
                      {{ item.product.title }}
                    </router-link>
                    <!-- 單價 -->
                    <p class="mb-0">
                      單價：{{ '$ ' + $filters.currency(item.product.price) }} x
                      {{ item.qty }} {{ item.product.unit }}
                    </p>
                    <!-- 小計 -->
                    <p class="mb-0">小計：{{ '$ ' + $filters.currency(item.total) }}</p>
                    <!-- 數量增減 -->
                    <div class="input-group">
                      <button
                        class="btn btn-outline-primary border-secondary"
                        type="button"
                        @click="putCart(item, item.qty - 1)"
                        :disabled="item.qty - 1 === 0"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        class="form-control text-center bg-white"
                        placeholder=""
                        :value="item.qty"
                        disabled
                      />
                      <button
                        class="btn btn-outline-primary border-secondary"
                        type="button"
                        @click="putCart(item, item.qty + 1)"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item py-3">
                <div class="d-flex">
                  <div class="ms-auto">
                    <p class="mb-0 d-flex">
                      商品合計：
                      <span class="ms-auto">
                        {{ 'TWD$ ' + $filters.currency(cartsData.total) }}
                      </span>
                    </p>
                    <p class="mb-0 d-flex">
                      訂單總計：
                      <span class="ms-auto text-danger">
                        {{ 'TWD$ ' + $filters.currency(Math.floor(cartsData.final_total)) }}
                      </span>
                    </p>
                    <p>{{ percent }}</p>
                  </div>
                </div>
                <Form action="" v-slot="{ errors }" ref="couponForm" @submit="postCoupon">
                  <div class="input-group w-50 ms-auto mb-3">
                    <Field
                      id="userEmail"
                      name="優惠券"
                      type="text"
                      class="form-control"
                      placeholder="請輸入優惠券代碼"
                      rules="min:5"
                      v-model="couponCode"
                    ></Field>
                    <input
                      class="btn btn-primary text-white"
                      value="套用"
                      type="submit"
                      :disabled="Object.keys(errors).length !== 0 || couponCode === ''"
                    />
                  </div>
                </Form>
                <router-link to="/CheckoutInfo" class="btn btn-primary text-white w-100"
                  >填寫資料</router-link
                >
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    <Toast ref="toast"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartsData: {
        carts: [],
      },
      couponCode: '',
      percent: 0,
    };
  },
  emits: ['update'],
  props: ['cartsUpdate'],
  methods: {
    getCartsList() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading.status = true;
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.cartsData = res.data.data;
            if (!this.cartsData.carts.length && !this.isSubmitOrder) {
              this.$router.replace('/productsList');
            }
            if (this.cartsData.carts[0]) {
              this.percent = this.cartsData.carts[0].coupon
                ? `已打 ${this.cartsData.carts[0].coupon.percent} 折`
                : '未使用優惠券';
            }
            this.isLoading.status = false;
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('取得購物車清單有問題喔!', 'error');
        });
    },
    putCart(item, num) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const productData = { data: { product_id: item.product_id, qty: num } };
      this.axios
        .put(apiUrl, productData)
        .then((res) => {
          if (res.data.success) {
            this.$emit('update');
            this.getCartsList();
            if (item.qty < num) {
              this.$refs.toast.showToast(`已增加『${item.product.title}』數量囉!`);
            } else {
              this.$refs.toast.showToast(`已減少『${item.product.title}』數量囉!`, 'error');
            }
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法更新資料喔!', 'error');
        });
    },
    deleteCart(item) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading.itemID = item.id;
      this.axios
        .delete(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.$emit('update');
            this.getCartsList();
            this.$refs.toast.showToast(`已從購物車刪除『${item.product.title}』囉!`, 'error');
            this.isLoading.itemID = '';
          } else {
            this.$refs.toast.showToast(res.data.message);
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法刪除購物車內商品喔!', 'error');
        });
    },
    postCoupon() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      this.axios
        .post(apiUrl, { data: { code: this.couponCode } })
        .then((res) => {
          if (res.data.success) {
            this.$refs.toast.showToast(res.data.message);
            this.$refs.couponForm.resetForm();
            this.getCartsList();
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法套用優惠券喔!', 'error');
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
