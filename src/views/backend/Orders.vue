<template>
  <loading :active="isLoading.status"></loading>
  <div class="sticky-top bg-white">
    <h2 class="h3 mb-0 py-2">訂單列表</h2>
    <div class="d-flex py-2">
      <page :pages="totalPages" :currentPage="currentPage" @display-page="getOrders"
      class="me-2"></page>
      <search @filter-data="getFilterData"></search>
    </div>
  </div>
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
      <tr v-for="item in filterData" :key="item.id" :class="{'table-success': item.is_paid}">
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
            <input type="button" value="修改" class="btn btn-outline-dark border-secondary"
              @click="openEditModal(item)">
            <input type="button" value="刪除" class="btn btn-outline-danger border-secondary"
            :class="{'disabled': !item.is_paid}" @click="openDeleteModal(item)">
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <order-modal ref="orderModal" :data="tempOrder" @edit-total="putOrder"></order-modal>
  <del-modal ref="deleteModal" :title="tempOrder.user.name" tab="訂單"
    @delete-data="deleteOrder">
  </del-modal>
</template>

<script>
import orderModal from '../../components/backendModal/orderModal.vue';
import delModal from '../../components/backendModal/deleteModal.vue';

export default {
  data() {
    return {
      orders: [],
      tempOrder: {
        user: {},
      },
      currentPage: 1,
      totalPages: 0,
      searchData: '',
    };
  },
  methods: {
    // 預設值與變數連動，當值從元件傳出時就會跟著變化，若不設定預設值，只會從變數取得數值
    // 效果，當更新付款時，畫面刷新分頁不會跳回第一頁
    getOrders(page = this.currentPage) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.isLoading.status = true;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders;
          this.currentPage = res.data.pagination.current_page;
          this.totalPages = res.data.pagination.total_pages;
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.status = false;
      }).catch(() => {
        this.swal('無法取得資料喔～快去看什麼問題吧！', 'error');
      });
    },
    getFilterData(data) {
      this.searchData = data;
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
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法修改資料喔～快去看什麼問題吧！', 'error');
      });
    },
    deleteOrder() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading.itemID = this.tempOrder.id;
      this.axios.delete(apiUrl).then((res) => {
        if (res.data.success) {
          this.isLoading.itemID = '';
          this.$refs.deleteModal.hideModal();
          this.getOrders();
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法刪除資料喔～快去看什麼問題吧！', 'error');
      });
    },
    openDeleteModal(item) {
      this.tempOrder = { ...item };
      this.$refs.deleteModal.showModal();
    },
    openEditModal(item) {
      this.tempOrder = JSON.parse(JSON.stringify(item));
      this.$refs.orderModal.showModal();
    },
  },
  components: {
    orderModal,
    delModal,
  },
  computed: {
    filterData() {
      return this.orders.filter((item) => item.user.name.match(this.searchData));
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
