<template>
  <loading :active="isLoading.status"></loading>
  <div class="sticky-top bg-white">
    <h2 class="h3 mb-0 py-2">商品列表</h2>
    <div class="d-flex align-items-center py-2">
      <input type="button" value="新增" class="btn btn-primary me-2"
        @click="openProductModal(this.product)">
      <page :pages="totalPages" :currentPage="currentPage" @display-page="getProducts"
      class="me-2"></page>
      <div class="input-group">
        <span class="input-group-text">搜尋商品名稱</span>
        <search @filter-data="getFilterData"></search>
      </div>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>分類</th>
        <th>商品縮圖</th>
        <th>標題</th>
        <th>描述</th>
        <th>售價</th>
        <th>上架</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filterData" :key="item.id" :class="{'table-success': item.is_enabled}">
        <td>{{item.category}}</td>
        <td>
          <img :src="item.imageUrl" :alt="item.title" style="width: 120px; height: 100px;"
            class="img-thumbnail">
        </td>
        <td>{{item.title}}</td>
        <td class="text-start">{{item.description}}</td>
        <td>{{item.price}}</td>
        <td class="align-middle">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" :id="item.id"
              :checked="item.is_enabled" @change="putProduct(item, 'isEnabled')">
            <label class="form-check-label" :for="item.id">
              {{item.is_enabled ? '已啟用' : '未啟用'}}
              <span class="spinner-border spinner-border-sm me-2" role="status"
               aria-hidden="true" v-if="isLoading.itemID === item.id"></span>
            </label>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-secondary" :class="{'disabled': item.is_enabled}"
              @click="openProductModal(item)">修改
            </button>
            <input type="button" value="刪除" class="btn btn-outline-danger border-secondary"
              :class="{'disabled': item.is_enabled}" @click="openDeleteModal(item)">
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <product-modal ref="productModal" :product-data="tempProduct"
    @update="getProducts"></product-modal>
  <del-modal ref="deleteModal" :title="tempProduct.title" tab="商品"
    @delete-data="deleteProduct">
  </del-modal>
</template>

<script>
import productModal from '../../components/backendModal/productModal.vue';
import delModal from '../../components/backendModal/deleteModal.vue';

export default {
  data() {
    return {
      products: [],
      product: {
        category: '',
        content: '',
        description: '',
        origin_price: 0,
        price: 0,
        title: '',
        unit: '',
        num: '',
        imageUrl: '',
        imagesUrl: [],
        options: {
          stars: 0,
          calorie: 0,
        },
      },
      tempProduct: {},
      currentPage: 1,
      totalPages: 0,
      searchData: '',
    };
  },
  methods: {
    getProducts(page = this.currentPage) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading.status = true;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.totalPages = res.data.pagination.total_pages;
          this.currentPage = res.data.pagination.current_page;
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.status = false;
      }).catch(() => {
        this.swal('無法取得產品資料喔～快去看什麼問題吧！', 'error');
      });
    },
    putProduct(item) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      const productObj = { data: { ...item } };
      this.isLoading.itemID = item.id;
      productObj.data.is_enabled = !productObj.data.is_enabled;
      this.axios.put(apiUrl, productObj).then((res) => {
        if (res.data.success) {
          this.getProducts();
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.itemID = '';
      }).catch(() => {
        this.swal('無法修改產品資料喔～快去看什麼問題吧！', 'error');
      });
    },
    deleteProduct() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading.itemID = this.tempProduct.id;
      this.axios.delete(apiUrl).then((res) => {
        if (res.data.success) {
          this.$refs.deleteModal.hideModal();
          this.swal(res.data.message);
          this.getProducts();
        } else {
          this.swal(res.data.message);
        }
        this.isLoading.itemID = '';
      }).catch(() => {
        this.swal('無法刪除產品資料喔～快去看什麼問題吧！', 'error');
      });
    },
    openProductModal(item) {
      this.tempProduct = JSON.parse(JSON.stringify(item));
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      this.$refs.productModal.showModal();
    },
    openDeleteModal(item) {
      this.tempProduct = { ...item };
      this.$refs.deleteModal.showModal();
    },
    getFilterData(data) {
      this.searchData = data;
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    productModal,
    delModal,
  },
  computed: {
    filterData() {
      return this.products.filter((item) => item.title.match(this.searchData));
    },
  },
};
</script>
