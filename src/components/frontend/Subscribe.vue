<template>
  <div class="">
    <!-- 訂閱我們 -->
    <figure class="studio__subscribe d-flex align-items-center mb-0">
      <div class="container mt-lg-5">
        <div class="col-lg-6">
          <p class="h3 text-white">
            請訂閱我們<br />
            <span class="h4">分享健身小知識，折扣代碼不錯過。</span>
          </p>
        </div>
        <div class="col-md-6 col-lg-4">
          <Form action="" v-slot="{ errors }" ref="subForm" @submit="clickSubscribe">
            <div class="input-group">
              <Field
                id="userEmail"
                name="聯絡信箱"
                type="email"
                class="form-control"
                placeholder="請輸入電子信箱"
                rules="email"
                v-model="email"
              ></Field>
              <input
                class="btn btn-primary"
                value="送出"
                type="submit"
                :disabled="Object.keys(errors).length !== 0 || email === ''"
              />
            </div>
          </Form>
        </div>
      </div>
    </figure>
    <toast ref="toast"></toast>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    clickSubscribe() {
      this.email = '';
      this.$refs.subForm.resetForm();
      this.$refs.toast.showToast('輸入『VF777』享優惠，感謝您的訂閱。');
    },
  },
};
</script>
