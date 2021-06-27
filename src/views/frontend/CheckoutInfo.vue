<template>
  <div>
    <loading :active="isLoading.status"></loading>
    <div class="container my-5">
      <div class="row">
        <!-- 購物流程 -->
        <div class="col-9 mx-auto">
          <div class="position-relative mb-5 pb-5">
            <div class="progress" style="height: 1px;">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 50%;"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <router-link
              to="/checkout"
              class="position-absolute top-0 start-0 translate-middle btn btn-primary rounded-pill"
              style="width: 2rem; height:2rem;"
            >
            </router-link>
            <p class="position-absolute top-0 start-0 translate-middle mt-4 pt-2">確認商品</p>
            <button
              type="button"
              class="position-absolute top-0 start-50 translate-middle btn btn-primary rounded-pill"
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
          </div>
        </div>
        <!-- 填寫資料與檢視商品 -->
        <div class="col-lg-9 mx-auto">
          <div class="row flex-md-row-reverse row-cols-1 row-cols-md-2">
            <!-- 您的訂購 -->
            <div class="col mb-5 mb-md-0">
              <section>
                <h2 class="text-center fw-bolder mb-3 mb-md-5">您的訂購</h2>
                <ul class="list-group">
                  <li class="list-group-item" v-for="item in cartsData.carts" :key="item.id">
                    <div class="d-flex align-items-center">
                      <!-- 產品圖片 -->
                      <router-link :to="`/product/${item.product.id}`" class="link-dark">
                        <img
                          :src="item.product.imageUrl"
                          :alt="item.title"
                          class="studio__checkout__img rounded me-3"
                        />
                      </router-link>
                      <!-- 數量增減群組與小計 -->
                      <div class="w-100">
                        <!-- 產品名稱 -->
                        <router-link :to="`/product/${item.product.id}`" class="link-dark">
                          {{ item.product.title }}
                        </router-link>
                        <!-- 單價 -->
                        <p class="mb-0">
                          單價：{{ '$ ' + $filters.currency(item.product.price) }} x
                          {{ item.product.num }}
                        </p>
                        <!-- 小計 -->
                        <p class="text-end mb-0">
                          小計：{{ '$ ' + $filters.currency(item.total) }}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
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
                  </li>
                </ul>
              </section>
            </div>
            <!-- 訂購人資訊 -->
            <div class="col">
              <section v-if="cartsData.carts[0]">
                <h2 class="text-center fw-bolder mb-3">訂購人資訊</h2>
                <Form action="" v-slot="{ errors }" ref="orderForm" @submit="postOrder">
                  <div class="row row-cols-1 g-3">
                    <div class="col">
                      <label for="userName" class="form-label"
                        >訂購人姓名
                        <span class="text-danger">*</span>
                      </label>
                      <Field
                        id="userName"
                        name="訂購人姓名"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['訂購人姓名'], 'is-valid': order.user.name }"
                        :rules="checkName"
                        placeholder="請輸入姓名"
                        v-model="order.user.name"
                      ></Field>
                      <error-message name="訂購人姓名" class="invalid-feedback"></error-message>
                    </div>
                    <div class="col">
                      <label for="userEmail" class="form-label"
                        >聯絡信箱
                        <span class="text-danger">*</span>
                      </label>
                      <Field
                        id="userEmail"
                        name="聯絡信箱"
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': errors['聯絡信箱'], 'is-valid': order.user.email }"
                        placeholder="請輸入電子信箱"
                        rules="email|required"
                        v-model="order.user.email"
                      ></Field>
                      <error-message name="聯絡信箱" class="invalid-feedback"></error-message>
                    </div>
                    <div class="col">
                      <label for="userTel" class="form-label"
                        >手機號碼
                        <span class="text-danger">*</span>
                      </label>
                      <Field
                        id="userTel"
                        name="手機號碼"
                        type="tel"
                        class="form-control"
                        :class="{ 'is-invalid': errors['手機號碼'], 'is-valid': order.user.tel }"
                        :rules="checkPhone"
                        placeholder="請輸入手機號碼"
                        v-model="order.user.tel"
                      ></Field>
                      <error-message name="手機號碼" class="invalid-feedback"></error-message>
                    </div>
                    <div class="col">
                      <label for="userAddress" class="form-label"
                        >聯絡地址
                        <span class="text-danger">*</span>
                      </label>
                      <Field
                        id="userAddress"
                        name="聯絡地址"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid': errors['聯絡地址'],
                          'is-valid': order.user.address,
                        }"
                        rules="required"
                        placeholder="請輸入聯絡地址"
                        v-model="order.user.address"
                      ></Field>
                      <error-message name="聯絡地址" class="invalid-feedback"></error-message>
                    </div>
                    <div class="col">
                      <label for="userMessage" class="form-label">備註</label>
                      <Field
                        id="userMessage"
                        name="備註"
                        type="text"
                        class="form-control"
                        :class="{ 'is-valid': order.message }"
                        placeholder="餐點口味(海苔、孜然、莎莎醬)"
                        v-model="order.message"
                        as="textarea"
                        rows="3"
                      ></Field>
                      <error-message name="備註" class="invalid-feedback"></error-message>
                    </div>
                    <!-- RWD 時置底 -->
                    <input
                      type="submit"
                      value="送出訂單"
                      class="btn btn-primary text-white"
                      :disabled="Object.keys(errors).length !== 0 || !checkData"
                    />
                  </div>
                </Form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartsData: {
        carts: [],
      },
      order: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isSubmitOrder: false,
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
          this.isLoading.status = false;
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
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('取得購物車清單有問題喔～快去看什麼問題吧！', 'error');
        });
    },
    postOrder() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      this.axios
        .post(apiUrl, { data: this.order })
        .then((res) => {
          if (res.data.success) {
            this.isSubmitOrder = true;
            this.$refs.toast.showToast('感謝您的選購，還請確認付款資訊，謝謝。');
            this.$refs.orderForm.resetForm();
            this.$emit('update');
            setTimeout(() => {
              this.$router.replace(`/order/${res.data.orderId}`);
            }, 2000);
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法送出訂單喔～', 'error');
        });
    },
    checkName(value) {
      const name = /^[\u4e00-\u9fa5]+$|^[a-zA-Z\s]+$/;
      return name.test(value) ? true : '請輸入中/英文姓名';
    },
    checkPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的"手機"號碼';
    },
  },
  created() {
    this.getCartsList();
  },
  computed: {
    checkData() {
      const attrs = ['name', 'email', 'tel', 'address'];
      return attrs.every((item) => this.order.user[item] !== '');
    },
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
