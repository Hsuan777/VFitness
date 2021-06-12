<template>
  <header class="d-flex align-items-center py-2">
    <h3 class="mb-0">訂單列表</h3>
    <input type="search" name="" id="" class="ms-auto">
  </header>
  <div class="card-body">
    <table class="table">
      <thead>
        <tr>
          <th>訂購人</th>
          <th>聯絡信箱</th>
          <th>連絡電話</th>
          <th>住址</th>
          <th>商品</th>
          <th>總金額</th>
          <th>付款狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id" :class="{'table-success': item.is_paid}">
          <td>{{item.user.name}}</td>
          <td>{{item.user.email}}</td>
          <td>{{item.user.tel}}</td>
          <td>{{item.user.address}}</td>
          <td>
            <p v-for="productItem in item.products" :key="productItem.product.id" class="mb-0">
              {{productItem.product.title}}
            </p>
          </td>
          <td>{{item.total}}</td>
          <td width="200">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" :id="item.id"
              :checked="item.is_paid" @change="putOrder(item, 'isPaid')">
              <label class="form-check-label" :for="item.id">
                {{item.is_paid ? '已付款' : '未付款'}}
                <span class="spinner-border spinner-border-sm me-2" role="status"
                aria-hidden="true"
                v-if="isLoading.itemID === item.id"></span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <!-- 可以修改金額與付款狀態 -->
              <input type="button" value="刪除" class="btn btn-outline-danger border-secondary"
              :class="{'disabled': !item.is_paid}" @click="openDeleteModal">
            </div>
            <delete-modal ref="deleteModal" :data="item.user.name" tab="訂單"
            data-delete="deleteOrder">
            </delete-modal>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import deleteModal from '../../components/deleteModal.vue';

export default {
  data() {
    return {
      isLoading: {
        itemID: '',
      },
      orders: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders;
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('無法取得資料喔～快去看什麼問題吧！');
      });
    },
    putOrder(item, action) {
      const orderObj = { data: { ...item } };
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${orderObj.data.id}`;
      this.isLoading.itemID = item.id;
      if (action === 'isPaid') {
        orderObj.data.is_paid = !orderObj.data.is_paid;
      }
      this.axios.put(apiUrl, orderObj).then((res) => {
        this.isLoading.itemID = '';
        if (res.data.success) {
          this.swal(res.data.message);
          this.getOrders();
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('無法修改資料喔～快去看什麼問題吧！');
      });
    },
    deleteOrder(itemID) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${itemID}`;
      this.isLoading.itemID = itemID;
      this.axios.delete(apiUrl).then((res) => {
        if (res.data.success) {
          this.isLoading.itemID = false;
          this.$ref.deleteModal.hide();
          this.getProducts();
        } else {
          this.swal(res.data.message);
        }
      }).catch(() => {
        this.swal('無法刪除資料喔～快去看什麼問題吧！');
      });
    },
    openDeleteModal() {
      // const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
      // modal.show();
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
    this.getOrders();
  },
  components: {
    deleteModal,
  },
};
</script>
