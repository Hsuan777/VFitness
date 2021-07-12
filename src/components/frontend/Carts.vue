<template>
  <section>
    <ul class="list-group list-group-flush px-3" v-if="cartsData.carts[0]">
      <li class="list-group-item" v-for="item in cartsData.carts" :key="item.id">
        <div class="d-flex align-items-center">
          <router-link :to="`/product/${item.product.id}`" class="link-dark me-5">
            {{ item.product.title }}
          </router-link>
          <button
            type="button"
            class="btn btn-link btn-sm pe-0 text-decoration-none link-secondary ms-auto"
            @click="deleteCart(item)"
          >
            <div
              class="spinner-border spinner-border-sm text-danger ms-auto me-3"
              role="status"
              v-if="isLoading.itemID === item.id"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <span v-else>X</span>
          </button>
        </div>
        <p class="d-flex mb-0">
          {{ '$' + $filters.currency(item.product.price) + ' x ' + item.qty }}
          <span class="ms-auto">{{ '$' + $filters.currency(item.total) }}</span>
        </p>
      </li>
      <li class="list-group-item">
        <p class="d-flex">
          商品合計
          <span class="text-danger ms-auto">{{
            'TWD$ ' + $filters.currency(cartsData.total)
          }}</span>
        </p>
        <router-link to="/checkout" class="btn btn-primary text-white w-100">
          檢視購物車
        </router-link>
      </li>
    </ul>
    <div class="px-2" v-else>
      <p class="text-center">還沒有商品喔!</p>
      <router-link to="/productsList" class="btn btn-primary text-white w-100"
        >前往選購</router-link
      >
    </div>
    <Toast ref="toast"></Toast>
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
    };
  },
  emits: ['update'],
  props: ['cartsData'],
  methods: {
    deleteCart(item) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading.itemID = item.id;
      this.axios
        .delete(apiUrl)
        .then((res) => {
          if (res.data.success) {
            // 若直接在這裡使用通知，會被視為與下拉選單同一區塊
            this.$emit('update', {
              message: `『${item.product.title}』，已從購物車刪除囉！`,
              status: 'error',
            });
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
          this.isLoading.itemID = '';
        })
        .catch(() => {
          this.$refs.toast.showToast('無法刪除商品喔～', 'error');
        });
    },
  },
};
</script>
