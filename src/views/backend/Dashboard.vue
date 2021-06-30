<template>
  <div>
    <!-- 置頂導覽列 -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="logo navbar-brand ms-2">VFitness</router-link>
        <div class="navbar-nav ms-auto">
          <a
            class="nav-link text-primary me-2 btn btn-outline-primary text-white"
            @click.prevent="signOut"
            >Sign out</a
          >
        </div>
      </div>
    </nav>
    <!-- Dashboard 內容 -->
    <div class="container-fluid">
      <div class="row g-0">
        <div class="height--vh col-2 sticky-top">
          <div class="px-2 py-3 bg-light h-100 position-relative">
            <p class="h3">功能列</p>
            <div class="list-group list-group-flush">
              <!-- 路由加上 linkActiveClass: 'active'，點擊路由時會自動加上 active -->
              <router-link to="/manage/products" class="list-group-item list-group-item-action">
                商品
              </router-link>
              <router-link to="/manage/orders" class="list-group-item list-group-item-action">
                訂單
              </router-link>
              <router-link to="/manage/articles" class="list-group-item list-group-item-action">
                文章
              </router-link>
              <router-link to="/manage/coupons" class="list-group-item list-group-item-action">
                優惠券
              </router-link>
            </div>
            <input
              type="button"
              value="Sign out"
              class="btn btn-primary position-absolute start-50 bottom-10 translate-middle w-50"
              @click="signOut"
            />
          </div>
        </div>
        <div class="col-10">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.axios
        .post(`${process.env.VUE_APP_API}/logout`)
        .then((res) => {
          document.cookie = 'hexToken=; expires=; path=/';
          if (res.data.success) {
            this.swal(res.data.message);
            this.$router.replace({ name: 'Signin' });
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('登出失敗!', 'error');
        });
    },
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.axios.defaults.headers.common.Authorization = token;
      this.axios.post(`${process.env.VUE_APP_API}/api/user/check`).then((res) => {
        if (!res.data.success) {
          this.$router.replace({ name: 'Signin' });
        }
      });
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
