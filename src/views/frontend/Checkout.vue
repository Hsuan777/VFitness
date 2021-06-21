<template>
  <loading :active="isLoading.status"></loading>
  <div class="container my-5">
    <!-- mobile 反轉購物車與表單 -->
    <div class="row" v-if="cartsData.carts[0]">
      <!-- 訂購人資訊 -->
      <section class="col-lg-6">
        <h2>訂購人資訊</h2>
        <Form action="" v-slot="{ errors }" ref="orderForm" @submit="postOrder">
          <div class="row row-cols-1 g-3">
            <div class="col">
              <label for="userName" class="form-label">訂購人姓名
                <span class="text-danger">*</span>
              </label>
              <Field id="userName" name="訂購人姓名" type="text" class="form-control"
              :class="{ 'is-invalid': errors['訂購人姓名'], 'is-valid': order.user.name }"
              :rules="checkName"
              v-model="order.user.name"></Field>
              <error-message name="訂購人姓名" class="invalid-feedback"></error-message>
            </div>
            <div class="col">
              <label for="userEmail" class="form-label">聯絡信箱
                <span class="text-danger">*</span>
              </label>
              <Field id="userEmail" name="聯絡信箱" type="email" class="form-control"
              :class="{ 'is-invalid': errors['聯絡信箱'], 'is-valid': order.user.email }"
              rules="email|required"
              v-model="order.user.email"></Field>
              <error-message name="聯絡信箱" class="invalid-feedback"></error-message>
            </div>
            <div class="col">
              <label for="userTel" class="form-label">手機號碼
                <span class="text-danger">*</span>
              </label>
              <Field id="userTel" name="手機號碼" type="tel" class="form-control"
              :class="{ 'is-invalid': errors['手機號碼'], 'is-valid': order.user.tel }"
              :rules="checkPhone"
              v-model="order.user.tel"></Field>
              <error-message name="手機號碼" class="invalid-feedback"></error-message>
            </div>
            <div class="col">
              <label for="userAddress" class="form-label">聯絡地址(餐飲外送用)
                <span class="text-danger">*</span>
              </label>
              <Field id="userAddress" name="聯絡地址" type="text" class="form-control"
              :class="{ 'is-invalid': errors['聯絡地址'], 'is-valid': order.user.address }"
              rules="required"
              v-model="order.user.address"></Field>
              <error-message name="聯絡地址" class="invalid-feedback"></error-message>
            </div>
            <div class="col">
              <label for="userMessage" class="form-label">備註</label>
              <Field id="userMessage" name="備註" type="text" class="form-control"
              :class="{ 'is-valid': order.message }"
              v-model="order.message" as="textarea" rows="3"></Field>
              <error-message name="備註" class="invalid-feedback"></error-message>
            </div>
            <!-- RWD 時置底 -->
            <input type="submit" value="送出訂單" class="btn btn-primary text-white"
            :disabled="Object.keys(errors).length !== 0 || !checkData">
          </div>
        </Form>
      </section>
      <!-- 購物車列表 -->
      <section class="col-lg-6">
        <header class="d-flex align-items-center mb-lg-3">
          <h2 class="mb-0">購物車列表</h2>
          <button type="button" class="btn btn-link link-secondary ms-auto pe-2"
          @click="deleteCartAll">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
            class="bi bi-cart-x" viewBox="0 0 16 16">
              <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0
              .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5
              0 0 0-.708-.708L8.5 6.793 7.354 5.646z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2
              0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0
              .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102
              4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1
              1 0 0 1 2 0z"/>
            </svg>
          </button>
        </header>
        <ul class="list-group">
          <li class="list-group-item" v-for="item in cartsData.carts" :key="item.id">
            <div class="d-flex align-items-center">
              <router-link :to="`/product/${item.product.id}`" class="link-dark">
                {{item.product.title}}
              </router-link>
              <input type="button" value="X"
              class="btn btn-link btn-sm pe-0 text-decoration-none link-secondary ms-auto"
              @click="deleteCart(item.id)">
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-0 me-3">{{'$' + item.product.price + ' x '}}</p>
              <!-- 數量增減 -->
              <div class="spinner-border spinner-border-sm text-danger ms-auto me-3"
                role="status" v-if="isLoading.itemID === item.id">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="input-group w-50" v-else>
                <button class="btn btn-primary" type="button"
                  @click="putCart(item, item.qty -1 )" :disabled="item.qty - 1 === 0"> - </button>
                <input type="text" class="form-control text-center bg-white"
                  placeholder="" :value="item.qty" disabled>
                <button class="btn btn-primary" type="button"
                  @click="putCart(item, item.qty + 1)"> + </button>
              </div>
              <span class="">{{'$'+item.total}}</span>
            </div>
          </li>
          <li class="list-group-item border-0">
            <p class="d-flex">商品合計
              <span class="h5 text-dark ms-auto">{{'$' + cartsData.total}}</span>
            </p>
            <p class="d-flex">訂單總計
              <span class="h4 text-danger ms-auto">
                {{'$' + Math.floor(cartsData.final_total)}}
              </span>
            </p>
            <div class="input-group w-50 ms-auto">
              <input type="text" class="form-control text-danger"
                placeholder="請輸入優惠券代碼" v-model="couponCode">
              <button class="btn btn-outline-secondary" type="button"
                @click="postCoupon">套用</button>
            </div>
          </li>
        </ul>
      </section>
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
          console.log(this.cartsData);
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
