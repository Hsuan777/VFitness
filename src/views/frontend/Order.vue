<template>
  <section class="container mt-5">
    <h2 class="text-center">感謝您的訂購!</h2>
    <h3 class="text-center">以下是您的訂購資訊，請確認後進行<span class="text-danger">付款</span>。</h3>
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <table class="table table-bordered border-secondary">
          <tbody>
            <tr>
              <th>訂購時間</th>
              <td>{{new Date().toLocaleString(order.create_at)}}</td>
            </tr>
            <tr>
              <th>訂購 ID (請記下可再查詢)</th>
              <td>{{order.id}}</td>
            </tr>
            <tr>
              <th>訂購人</th>
              <td>{{order.user.name}}</td>
            </tr>
            <tr>
              <th>聯絡信箱</th>
              <td>{{order.user.email}}</td>
            </tr>
            <tr>
              <th>聯絡電話</th>
              <td>{{order.user.tel}}</td>
            </tr>
            <tr>
              <th>地址</th>
              <td>{{order.user.address}}</td>
            </tr>
            <tr>
              <th>商品清單</th>
              <td>
                <p class="d-flex mb-0" v-for="item in order.products" :key="item.product.id">
                  {{item.product.title}} x {{item.qty}} {{item.product.unit}}=
                  <span class="ms-auto">${{Math.floor(item.final_total)}}</span>
                </p>
                <p class="text-end mb-0 border-top pt-1">合計 : ${{Math.floor(order.total)}}</p>
              </td>
            </tr>
            <tr>
              <th>您的備註</th>
              <td>{{order.message}}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>{{order.is_paid ? '已付款' : '未付款'}}</td>
            </tr>
          </tbody>
        </table>
        <!-- 無串接金流，故按下後自動付款 -->
        <input type="button" value="由此付款"
          class="btn btn-primary text-white d-block w-50 mx-auto" @click="payOrder">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  props: ['cartsUpdate'],
  methods: {
    getOrder() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.$route.params.id}`;
      this.axios.get(apiUrl).then((res) => {
        // 沒有 ID 也會過...
        if (res.data.success) {
          this.order = res.data.order;
          if (!this.order) {
            this.swal('查無此訂單喔！');
            setTimeout(() => {
              this.$router.replace('/productsList');
            }, 3000);
          }
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('無法取得資料喔～快去看什麼問題吧！');
      });
    },
    payOrder() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}}/pay/${this.order.id}`;
      this.axios.post(apiUrl).then((res) => {
        if (res.data.success) {
          this.swal(res.data.message);
          setTimeout(() => {
            this.$router.replace('/productsList');
          }, 3000);
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('無法取得資料喔～快去看什麼問題吧！');
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
    this.getOrder();
  },
};
</script>
