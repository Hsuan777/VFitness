<template>
  <ul class="list-group list-group-flush" v-if="cartsData.carts[0]">
    <li class="list-group-item" v-for="item in cartsData.carts" :key="item.id">
      <div class="d-flex align-items-center">
        <!-- 改成 route link -->
        <router-link :to="`/product/${item.product.id}`" class="me-5">
          {{item.product.title}}
        </router-link>
        <!-- <a :href="'product.html?id=' + item.id" class="me-5">{{item.product.title}}</a> -->
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
        <span class="text-danger ms-auto">{{'$' + cartsData.total}}</span>
      </p>
      <router-link to="/checkout" class="btn btn-primary text-white w-100">
        <i class="fas fa-list me-2"></i>檢視購物車
      </router-link>
    </li>
  </ul>
  <div class="card card-body" v-else>
    <p class="mb-0">還沒有商品喔～</p>
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
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('無法刪除資料喔～快去看什麼問題吧！');
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
  },
};
</script>
