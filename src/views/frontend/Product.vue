<template>
  <loading :active="isLoading.status"></loading>
  <!-- 商品細節 -->
  <section class="container mt-5">
    <div class="row justify-content-around">
      <div class="col-lg-4">
        <h1>{{product.title}}</h1>
        <img :src="product.imageUrl" alt="" class="img-fluid rounded">
      </div>
      <div class="col-lg-6">
        <h2 class="text-primary">{{product.category}}</h2>
        <p>{{product.description}}</p>
        <p>{{product.content}}</p>
        <h4 class="text-end mb-3">售價：{{product.price}}</h4>
        <div class="d-flex justify-content-between">
          <div class="input-group w-50" >
            <button class="btn btn-outline-secondary" type="button"
            @click="cartsOfProduct[0].qty -= 1"
            :disabled="cartsOfProduct[0].qty - 1 === 0"> - </button>
            <input type="text" class="form-control text-center text-danger bg-white"
            v-model="cartsOfProduct[0].qty" disabled>
            <button class="btn btn-outline-secondary" type="button"
            @click="cartsOfProduct[0].qty += 1"> + </button>
          </div>
          <template>
          </template>
          <div class="spinner-border text-danger ms-auto" role="status" v-if="isLoading.itemID">
            <span class="visually-hidden">Loading...</span>
          </div>
          <template v-else>
            <input type="button" value="更新購物車" class="btn btn-primary text-white"
            @click="putCart(cartsOfProduct[0])" v-if="cartsOfProduct[0].id">
            <input type="button" value="加入購物車" class="btn btn-primary text-white"
            @click="addCart(product.id, cartsOfProduct[0].qty)" v-else>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: {
        itemID: '',
        status: false,
      },
      product: {},
      productUrl: '',
      cartsOfProduct: [{
        qty: 1,
      }],
    };
  },
  emits: ['update'],
  props: ['cartsUpdate'],
  methods: {
    getProduct() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`;
      this.isLoading.status = true;
      this.axios.get(apiUrl).then((res) => {
        this.isLoading.status = false;
        if (res.data.success) {
          this.product = res.data.product;
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('無法取得產品資料喔～！');
      });
    },
    checkCartsList() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          const cartsData = res.data.data;
          let cartsOfProduct = [];
          this.cartsOfProduct = [{ qty: 1 }];
          cartsOfProduct = cartsData.carts
            .filter((item) => item.product.id === this.$route.params.id);
          if (cartsOfProduct[0]) {
            this.cartsOfProduct = [...cartsOfProduct];
          }
        } else {
          this.swal(res.data.message);
        }
      }).catch((res) => {
        console.log(res);
        this.swal('無法取得購物車資料喔～！');
      });
    },
    addCart(itemID, num) {
      this.isLoading.itemID = itemID;
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const productData = { data: { product_id: itemID, qty: num } };
      this.axios.post(apiUrl, productData).then((res) => {
        if (res.data.success) {
          this.isLoading.itemID = '';
          // 觸發父層元件之函式，但在這得先定義 emits
          this.$emit('update');
          this.swal(res.data.message);
          this.checkCartsList();
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('無法加入購物車喔～！');
      });
    },
    putCart(item) {
      // 必須是購物車 ID 作為 apiUrl，去更新購物車商品
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const productData = { data: { product_id: item.product_id, qty: item.qty } };
      // this.addLoading = true;
      this.axios.put(apiUrl, productData).then((res) => {
        if (res.data.success) {
          // this.isLoading = false;
          this.$emit('update');
          this.swal(res.data.message);
        } else {
          this.swal(`${res.data.message}，請重新整理頁面。`);
        }
      }).catch(() => {
        this.swal('無法更新資料喔～快去看什麼問題吧！');
      });
    },
    swal(msg) {
      this.$swal.fire({
        position: 'center',
        title: msg,
        width: 'auto',
        showConfirmButton: false,
        timer: 2000,
      });
    },
    test(data) {
      console.log(data);
      console.log('Y');
    },
  },
  created() {
    this.getProduct();
    this.checkCartsList();
  },
  watch: {
    $route(to) {
      if (this.product.id !== to.params.id && to.name === 'Product') {
        this.getProduct();
        this.checkCartsList();
      }
    },
    cartsUpdate(value) {
      if (value) {
        this.checkCartsList();
      }
    },
  },
};
</script>
