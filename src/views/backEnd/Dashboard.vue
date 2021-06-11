<template>
  <div id="app">
    <loading :active="isLoading"></loading>
    <!-- 置頂導覽列 -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">V.S</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#backEndTopNav" aria-controls="backEndTopNav"
        aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="backEndTopNav">
          <div class="navbar-nav ms-auto">
            <a class="nav-link" href="#" @click.prevent="signOut">Sign out</a>
          </div>
        </div>
      </div>
    </nav>
    <!-- Dashboard 內容 -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-2">
          <div class="p-2 border-end bg-light">
            <p class="h3">功能列</p>
            <ul class="list-group list-group-flush">
              <!-- <li class="list-group-item">
                <router-link to="/products">商品</router-link>
              </li> -->
              <li class="list-group-item">
                <router-link to="/manage/orders">訂單</router-link>
              </li>
              <!-- <li class="list-group-item">
                <router-link to="/articles">文章</router-link>
              </li>
              <li class="list-group-item">
                <router-link to="/coupons">優惠券</router-link>
              </li> -->
            </ul>
          </div>
        </div>
        <div class="col-10">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    signOut() {
      this.axios.post(`${process.env.VUE_APP_API_URL}/logout`).then((res) => {
        document.cookie = 'hexToken=; expires=; path=/';
        if (res.data.success) {
          this.swal(res.data.message);
          this.$router.replace({ name: 'Signin' });
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('登出失敗!');
      });
    },
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.axios.defaults.headers.common.Authorization = token;
      this.axios.post(`${process.env.VUE_APP_API_URL}/api/user/check`).then((res) => {
        if (!res.data.success) {
          this.$router.replace({ name: 'Signin' });
        }
      });
    },
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
  created() {
    this.checkLogin();
  },
};
</script>
