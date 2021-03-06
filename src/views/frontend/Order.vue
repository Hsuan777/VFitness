<template>
  <div class="container my-5">
    <!-- 購物流程 -->
    <div class="row">
      <div class="col-9 mx-auto">
        <div class="position-relative mb-5 pb-5">
          <div class="progress" style="height: 1px;">
            <div
              class="progress-bar"
              role="progressbar"
              style="width: 100%;"
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <button
            type="button"
            class="position-absolute top-0 start-0 translate-middle btn btn-primary rounded-pill"
            style="width: 2rem; height:2rem;"
          ></button>
          <p class="position-absolute top-0 start-0 translate-middle mt-4 pt-2">確認商品</p>
          <button
            type="button"
            class="position-absolute top-0 start-50 translate-middle btn btn-primary rounded-pill"
            style="width: 2rem; height:2rem;"
          ></button>
          <p class="position-absolute top-0 start-50 translate-middle mt-4 pt-2">填寫資料</p>
          <button
            type="button"
            class="position-absolute top-0 start-100 translate-middle btn btn-primary rounded-pill"
            style="width: 2rem; height:2rem;"
          ></button>
          <p
            class="position-absolute top-0 start-100 translate-middle text-nowrap mt-4
          pt-2"
          >
            結賬
          </p>
        </div>
      </div>
    </div>
    <section>
      <h2 class="text-center fw-bolder mb-3 mb-lg-5">感謝您的訂購!</h2>
      <p class="h3 text-center">
        以下是您的訂購資訊，<span class="d-md-none"><br /></span> 請確認後進行<span
          class="text-danger"
          >付款</span
        >。
      </p>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <table class="table table-bordered border-secondary">
            <tbody>
              <tr>
                <th>訂購時間</th>
                <td>{{ new Date().toLocaleString(order.create_at) }}</td>
              </tr>
              <tr>
                <th>訂購 ID</th>
                <td>
                  <input ref="orderID" type="text" :value="order.id" class="form-control mb-2" />
                  <input
                    type="button"
                    value="點我複製以便查詢"
                    @click.prevent="copyOrderID"
                    class="btn btn-outline-primary"
                  />
                </td>
              </tr>
              <tr>
                <th>訂購人</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>聯絡信箱</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>聯絡電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>商品清單</th>
                <td>
                  <p
                    class="d-flex align-items-end border-bottom mb-0"
                    v-for="item in order.products"
                    :key="item.product.id"
                  >
                    {{ item.product.title }}<br />
                    $ {{ item.product.price }} x {{ item.qty }} {{ item.product.unit }} =
                    <span class="ms-auto">
                      $ {{ $filters.currency(Math.floor(item.final_total)) }}
                    </span>
                  </p>
                  <p class="text-end mb-0 pt-1">
                    合計 : TWD$ {{ $filters.currency(Math.floor(order.total)) }}
                  </p>
                </td>
              </tr>
              <tr>
                <th>折價券</th>
                <td>{{ percent }}折</td>
              </tr>
              <tr>
                <th>您的備註</th>
                <td>{{ order.message }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td class="fw-bold" :class="`text-${order.is_paid ? 'success' : 'danger'}`">
                  {{ order.is_paid ? '已付款' : '未付款' }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 無串接金流，故按下後自動付款 -->
          <input
            v-if="!order.is_paid"
            type="button"
            value="由此付款"
            class="btn btn-primary btn-lg text-white d-block w-50 mx-auto"
            @click="payOrder"
          />
          <input
            v-else
            type="button"
            value="繼續選購"
            class="btn btn-primary btn-lg text-white d-block w-50 mx-auto"
            @click="this.$router.replace('/productsList')"
          />
        </div>
      </div>
    </section>
    <Toast ref="toast"/>
  </div>
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
      orders: [],
      percent: 0,
    };
  },
  methods: {
    getOrder() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.$route.params.id}`;
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success && res.data.order) {
            this.order = res.data.order;
            const firstProduct = Object.keys(this.order.products)[0];
            this.percent = this.order.products[firstProduct].coupon
              ? `${this.order.products[firstProduct].coupon.percent} `
              : '未打';
          } else {
            this.$refs.toast.showToast('查無此訂單喔!', 'error');
            setTimeout(() => {
              this.$router.replace('/productsList');
            }, 3000);
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法取得資料喔!', 'error');
        });
    },
    payOrder() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`;
      this.axios
        .post(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.$refs.toast.showToast('已完成付款並通知商家囉!');
            this.getOrder();
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('未完成付款，請稍後再試。', 'error');
        });
    },
    copyOrderID() {
      document.execCommand('Copy', false, this.$refs.orderID.select());
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
