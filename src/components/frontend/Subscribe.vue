<template>
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
        <div class="input-group">
          <input type="text" class="form-control" placeholder="輸入電子信箱" />
          <button class="btn btn-primary" type="button" @click="clickSubscribe">送出</button>
        </div>
      </div>
    </div>
  </figure>
</template>

<script>
export default {
  methods: {
    clickSubscribe() {
      this.swal('感謝您的訂閱');
    },
  },
};
</script>
