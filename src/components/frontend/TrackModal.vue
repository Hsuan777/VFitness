<template>
  <div
    class="modal fade"
    ref="trackModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="trackModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title h5 text-primary">訂單查詢</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetData"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table table-bordered border-secondary" v-if="tempOrder.id">
            <tbody>
              <tr>
                <th>訂購時間</th>
                <td>{{ new Date().toLocaleString(tempOrder.create_at) }}</td>
              </tr>
              <tr>
                <th>訂購 ID</th>
                <td>{{ tempOrder.id }}</td>
              </tr>
              <tr>
                <th>訂購人</th>
                <td>{{ tempOrder.user.name }}</td>
              </tr>
              <tr>
                <th>聯絡信箱</th>
                <td>{{ tempOrder.user.email }}</td>
              </tr>
              <tr>
                <th>聯絡電話</th>
                <td>{{ tempOrder.user.tel }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{{ tempOrder.user.address }}</td>
              </tr>
              <tr>
                <th>商品清單</th>
                <td>
                  <p
                    class="d-flex align-items-end border-bottom mb-0"
                    v-for="item in tempOrder.products"
                    :key="item.product.id"
                  >
                    {{ item.product.title }}<br />
                    $ {{ item.product.price }} x {{ item.qty }} {{ item.product.unit }} =
                    <span class="ms-auto">
                      $ {{ $filters.currency(Math.floor(item.final_total)) }}
                    </span>
                  </p>
                  <p class="text-end mb-0 pt-1">
                    合計 : TWD$ {{ $filters.currency(Math.floor(tempOrder.total)) }}
                  </p>
                </td>
              </tr>
              <tr>
                <th>折價券</th>
                <td>{{ percent }}折</td>
              </tr>
              <tr>
                <th>您的備註</th>
                <td>{{ tempOrder.message }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>{{ tempOrder.is_paid ? '已付款' : '商家確認中' }}</td>
              </tr>
            </tbody>
          </table>
          <div class="input-group" v-else>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入訂單序號"
              v-model="orderID"
              @keydown.enter="getOrder"
            />
            <button
              class="btn btn-outline-dark"
              :disabled="!orderID"
              type="button"
              @click="getOrder"
            >
              查詢
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-dark"
            :disabled="!orderID"
            @click="resetData"
          >
            Reset
          </button>
          <button
            type="button"
            class="btn btn-outline-dark"
            data-bs-dismiss="modal"
            @click="resetData"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      orderID: '',
      order: {
        id: '',
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        products: {},
        message: '',
      },
      tempOrder: {},
      percent: 0,
      modal: {},
    };
  },
  methods: {
    getOrder() {
      if (!this.orderID) {
        return;
      }
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderID}`;
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success && res.data.order) {
            this.tempOrder = res.data.order;
            const firstProduct = Object.keys(this.tempOrder.products)[0];
            this.percent = this.tempOrder.products[firstProduct].coupon
              ? `${this.tempOrder.products[firstProduct].coupon.percent} `
              : '未打';
            this.$refs.toast.showToast('感謝您的訂購。');
          } else {
            this.resetData();
            this.$refs.toast.showToast('查無此訂單喔！', 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法取得資料喔～', 'error');
        });
    },
    resetData() {
      this.orderID = '';
      this.tempOrder = JSON.parse(JSON.stringify(this.order));
    },
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  created() {
    this.resetData();
  },
  mounted() {
    this.modal = new Modal(this.$refs.trackModal);
  },
};
</script>
