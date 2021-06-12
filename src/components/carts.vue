<template>
  <ul class="list-group list-group-flush" v-if="cartsData.carts[0]">
    <li class="list-group-item" v-for="item in cartsData.carts" :key="item.id">
      <div class="d-flex align-items-center">
        <a :href="'product.html?id=' + item.id" class="me-5">{{item.product.title}}</a>
        <input type="button" value="X"
        class="btn btn-link btn-sm pe-0 text-decoration-none link-secondary ms-auto"
        @click="deleteCart(item.id)">
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
      // cartsData: {
      //   carts: [],
      // },
    };
  },
  props: ['cartsData'],
  methods: {
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
};
</script>
