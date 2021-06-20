<template>
  <loading :active="isLoading.status"></loading>
  <div class="sticky-top bg-white ps-2 pt-2 mb-1">
    <h2 class="h3">優惠券列表</h2>
    <div class="d-flex">
      <input type="button" value="新增" class="btn btn-primary me-2"
        @click="openCouponModal">
      <page :pages="totalPages" :currentPage="currentPage" @display-page="getCoupons"
      class="me-2"></page>
      <div class="input-group">
        <span class="input-group-text">搜尋優惠券名稱</span>
        <search @filter-data="getFilterData"></search>
      </div>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th class="text-center border-secondary">優惠券名稱</th>
        <th class="border-secondary">優惠券代碼</th>
        <th class="text-center border-secondary">折扣率</th>
        <th class="border-secondary">期限</th>
        <th class="border-secondary">是否啟用</th>
        <th class="border-secondary">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filterData" :key="item.id" :class="{'table-primary': item.is_enabled}">
        <td class="text-center">{{item.title}}</td>
        <td>{{item.code}}</td>
        <td class="text-center">{{item.percent}}</td>
        <td>{{new Date(item.due_date).toLocaleString()}}</td>
        <td width="200">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" :id="item.id"
              :checked="item.is_enabled" @change="putCoupon(item)">
            <label class="form-check-label" :for="item.id">
              {{item.is_enabled ? '已啟用' : '未啟用'}}
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"
                v-if="isLoading.itemID === item.id"></span>
            </label>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-dark border-secondary"
              :class="{'disabled': item.is_enabled}"
              @click="openCouponModal(item)">修改
            </button>
            <input type="button" value="刪除" class="btn btn-outline-danger border-secondary"
              :class="{'disabled': item.is_enabled}" @click="openDeleteModal(item)">
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <coupon-modal ref="couponModal" :coupon-data="tempCoupon" @update="getCoupons"></coupon-modal>
  <del-modal ref="deleteModal" :title="tempCoupon.code" tab="優惠券" @delete-data="deleteCoupon">
  </del-modal>
</template>

<script>
import couponModal from '../../components/backendModal/couponModal.vue';
import delModal from '../../components/backendModal/deleteModal.vue';

export default {
  data() {
    return {
      coupons: [],
      coupon: {
        title: '',
        percent: 0,
        code: '',
      },
      tempCoupon: {},
      currentPage: 1,
      totalPages: 0,
      searchData: '',
    };
  },
  methods: {
    getCoupons(page = 1) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading.status = true;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          this.coupons = res.data.coupons;
          this.totalPages = res.data.pagination.total_pages;
          this.currentPage = res.data.pagination.current_page;
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.status = false;
      }).catch(() => {
        this.swal('無法取得優惠券資料喔～快去看什麼問題吧！', 'error');
      });
    },
    // 更新是否啟用
    putCoupon(item) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
      const couponObj = { data: { ...item } };
      this.isLoading.itemID = item.id;
      if (couponObj.data.is_enabled === 0) {
        couponObj.data.is_enabled = 1;
      } else {
        couponObj.data.is_enabled = 0;
      }
      this.axios.put(apiUrl, couponObj).then((res) => {
        if (res.data.success) {
          this.loading = false;
          this.getCoupons();
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.itemID = '';
      }).catch(() => {
        this.swal('無法修改資料喔～快去看什麼問題吧！', 'error');
      });
    },
    deleteCoupon() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading.itemID = this.tempCoupon.id;
      this.axios.delete(apiUrl).then((res) => {
        if (res.data.success) {
          this.$refs.deleteModal.hideModal();
          this.getCoupons();
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.itemID = '';
      }).catch((res) => {
        this.swal('無法刪除資料喔～快去看什麼問題吧！', 'error');
        console.log(res);
      });
    },
    openCouponModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.couponModal.showModal();
    },
    openDeleteModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.deleteModal.showModal();
    },
    getFilterData(data) {
      this.searchData = data;
    },
  },
  created() {
    this.getCoupons();
  },
  components: {
    couponModal,
    delModal,
  },
  computed: {
    filterData() {
      return this.coupons.filter((item) => item.code.match(this.searchData));
    },
  },
};
</script>
