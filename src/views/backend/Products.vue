<template>
  <div>
    <Loading :active="isLoading.status"></Loading>
    <div class="sticky-top bg-white ps-2 py-3 mb-1">
      <h2 class="h3">商品列表</h2>
      <div class="d-flex">
        <input
          type="button"
          value="新增"
          class="btn btn-primary"
          @click="openProductModal(this.product)"
        />
        <Page
          :pages="totalPages"
          :currentPage="currentPage"
          @display-page="getProducts"
          class="mx-2"
        ></Page>
        <div class="input-group">
          <span class="input-group-text">搜尋商品標題</span>
          <Search @filter-data="getFilterData"></Search>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th width="100" class="text-center border-secondary">分類</th>
          <th width="150" class="border-secondary">商品縮圖</th>
          <th width="150" class="border-secondary">標題</th>
          <th width="250" class="border-secondary">描述</th>
          <th width="100" class="text-center border-secondary">售價</th>
          <th class="border-secondary">上架</th>
          <th class="border-secondary">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterData" :key="item.id" :class="{ 'table-primary': item.is_enabled }">
          <td class="text-center">{{ item.category }}</td>
          <td>
            <img
              :src="item.imageUrl"
              :alt="item.title"
              style="width: 120px; height: 100px;"
              class="img-thumbnail"
            />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td class="text-center">{{ $filters.currency(item.price) }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="item.id"
                :checked="item.is_enabled"
                @change="putProduct(item, 'isEnabled')"
              />
              <label class="form-check-label" :for="item.id">
                {{ item.is_enabled ? '已啟用' : '未啟用' }}
                <span
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                  v-if="isLoading.itemID === item.id"
                ></span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-dark border-secondary"
                :class="{ disabled: item.is_enabled }"
                @click="openProductModal(item)"
              >
                修改
              </button>
              <input
                type="button"
                value="刪除"
                class="btn btn-outline-danger border-secondary"
                :class="{ disabled: item.is_enabled }"
                @click="openDeleteModal(item)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ProductModal
      ref="productModal"
      :product-data="tempProduct"
      @update="getProducts"
    ></ProductModal>
    <DelModal ref="deleteModal" :title="tempProduct.title" tab="商品" @delete-data="deleteProduct">
    </DelModal>
  </div>
</template>

<script>
import ProductModal from '@/components/backendModal/ProductModal.vue';
import DelModal from '@/components/backendModal/DeleteModal.vue';

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
          food: {
            calories: 0, // 卡路里
            carbs: 0, // 碳水化合物
            protein: 0, // 蛋白質
            fat: 0, // 脂肪
          },
          course: {
            stars: '', // 難易度，低、中、難
            duration: 50, // 一堂50分
            teacher: '', // 老師
            area: '', // 上課區域
          },
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
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.totalPages = res.data.pagination.total_pages;
            this.currentPage = res.data.pagination.current_page;
            this.isLoading.status = false;
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('無法取得產品資料喔～快去看什麼問題吧！', 'error');
        });
    },
    putProduct(item) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      const productObj = { data: { ...item } };
      this.isLoading.itemID = item.id;
      productObj.data.is_enabled = !productObj.data.is_enabled;
      this.axios
        .put(apiUrl, productObj)
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
            this.swal(res.data.message);
            this.isLoading.itemID = '';
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('無法修改產品資料喔～快去看什麼問題吧！', 'error');
        });
    },
    deleteProduct() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading.itemID = this.tempProduct.id;
      this.axios
        .delete(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.$refs.deleteModal.hideModal();
            this.getProducts();
            this.swal(res.data.message);
            this.isLoading.itemID = '';
          } else {
            this.swal(res.data.message);
          }
        })
        .catch(() => {
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
    ProductModal,
    DelModal,
  },
  computed: {
    filterData() {
      return this.products.filter((item) => item.title.match(this.searchData));
    },
  },
};
</script>
