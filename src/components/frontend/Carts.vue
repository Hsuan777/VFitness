<template>
  <ul class="list-group list-group-flush px-3" v-if="cartsData.carts[0]">
    <li class="list-group-item" v-for="item in cartsData.carts" :key="item.id">
      <div class="d-flex align-items-center">
        <!-- 改成 route link -->
        <router-link :to="`/product/${item.product.id}`" class="link-dark me-5">
          {{item.product.title}}
        </router-link>
        <button type="button"
        class="btn btn-link btn-sm pe-0 text-decoration-none link-secondary ms-auto"
        @click="deleteCart(item.id)">
          <div class="spinner-border spinner-border-sm text-danger ms-auto me-3"
            role="status" v-if="isLoading.itemID === item.id">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span v-else>X</span>
        </button>
      </div>
      <p class="d-flex mb-0">{{'$' + item.product.price + ' x ' + item.qty}}
        <span class="ms-auto">{{'$'+ item.total}}</span>
      </p>
    </li>
    <li class="list-group-item">
      <p class="d-flex">商品合計
        <span class="text-danger ms-auto">{{'TWD$ ' + cartsData.total}}</span>
      </p>
      <router-link to="/checkout" class="btn btn-primary text-white w-100">
        檢視購物車
      </router-link>
    </li>
  </ul>
  <div class="px-2" v-else>
    <p class="text-center">還沒有商品喔!</p>
    <router-link to="/productsList" class="btn btn-primary text-white w-100">前往選購</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: {
        itemID: '',
        status: false,
      },
    };
  },
  props: ['cartsData'],
  methods: {
    // 刪除時無法觸發產品頁更新
    deleteCart(itemID) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${itemID}`;
      this.isLoading.itemID = itemID;
      this.axios.delete(apiUrl).then((res) => {
        if (res.data.success) {
          this.isLoading.itemID = '';
          this.$emit('update');
          this.swal('已刪除購物車商品囉！');
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法刪除商品喔～', 'error');
      });
    },
  },
};
</script>
