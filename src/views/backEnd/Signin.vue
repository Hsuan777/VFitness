<template>
  <div id="app">
    <loading :active="isLoading"></loading>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">V.S</a>
      </div>
    </nav>
    <!-- 登入 -->
    <section class="container mt-5">
      <div class="row">
        <div class="col-4 mx-auto">
          <h2 class="text-center mb-3">Sign in to Manage</h2>
          <!-- errors['對應 name 的名稱'] -->
          <Form action="" v-slot="{ errors }" @submit="signIn" ref="signForm">
            <div class="form-floating mb-3">
              <Field id="userName" name="Email" type="email" class="form-control"
              :class="{ 'is-invalid': errors['Email'] }"
              rules="email|required" v-model="userInfo.username"></Field>
              <error-message name="Email" class="invalid-feedback"></error-message>
              <label for="userName">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <Field id="userPw" name="Password" type="password" class="form-control"
              :class="{ 'is-invalid': errors['Password'] }"
              rules="required" v-model="userInfo.password"></Field>
              <error-message name="Password" class="invalid-feedback"></error-message>
              <label for="userPw">Password</label>
            </div>
            <div class="d-flex justify-content-around">
              <input type="submit" value="Sign in" class="btn btn-primary">
            </div>
          </Form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      isLoading: false,
    };
  },
  methods: {
    signIn() {
      this.isLoading = true;
      this.axios.post(`${process.env.VUE_APP_API}/admin/signin`, this.userInfo).then((res) => {
        const { token, expired } = res.data;
        // 登入與登出屬性必須一致，才能更新。
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
        this.$refs.signForm.resetForm();
        this.isLoading = false;
        if (res.data.success) {
          this.swal(res.data.message);
          this.$router.replace({ name: 'Products' });
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.isLoading = false;
        this.swal('登入失敗!');
      });
    },
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.axios.defaults.headers.common.Authorization = token;
      this.axios.post(`${process.env.VUE_APP_API}/api/user/check`).then((res) => {
        if (res.data.success) {
          this.$router.replace({ name: 'Manage' });
        } else {
          this.$router.replace({ name: 'Signin' });
        }
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
  created() {
    this.checkLogin();
  },
};
</script>
