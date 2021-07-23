<template>
  <div>
    <Loading :active="isLoading.status"/>
    <!-- 商品頁籤 -->
    <nav class="studio__stickyTop product__categoryTab container-fluid mb-3 bg-white">
      <div class="container">
        <ul class="nav row row-cols-2 row-cols-md-4 justify-content-around">
          <li
            v-for="(item, key) in categoryData"
            :key="key"
            class="product--hover col text-center py-lg-1"
            :class="{ 'product__categoryTab--active': category === key }"
          >
            <a
              class="nav-item nav-link link-dark h3 mb-0"
              href="#"
              @click.prevent="clickCategory(key)"
            >
              <div class="position-relative d-flex justify-content-center align-items-center">
                <span class="material-icons">{{ item.icon }}</span>
                {{ key }}
                <span
                  class="position-absolute top-0 start-50 translate-middle badge
                  rounded-pill text-primary ms-5 pt-3"
                  >{{ item.count }}
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- 商品列表 -->
    <section class="container">
      <ul class="list-unstyled row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
        <li class="col" v-for="item in finalDisplayData" :key="item.id">
          <div class="product--hover card card-body border-0">
            <!-- 產品圖片 -->
            <figure class="position-relative">
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="product__list__img mb-2 rounded-3"
              />
              <!-- 我的最愛按鈕 -->
              <button
                type="button"
                class="product__list__functionBtn btn btn-link link-primary
                  text-decoration-none d-flex align-items-center position-absolute top-0 end-0"
                @click="setLocalStorage(item)"
              >
                <span class="material-icons text-primary h2">
                  {{
                    this.localStorageProductID.some((id) => id === item.id)
                      ? 'bookmark'
                      : 'bookmark_border'
                  }}
                </span>
              </button>
            </figure>
            <!-- 產品標題 -->
            <h3 class="h4 mb-0">
              <router-link
                :to="`/product/${item.id}`"
                class="text-decoration-none text-dark d-block text-truncate stretched-link"
              >
                {{ item.title }}
              </router-link>
            </h3>
            <!-- 價格與購物車 -->
            <div class="d-flex justify-content-between align-items-center my-2 pb-2 border-bottom">
              <!-- 價格 -->
              <p class="display-7 mb-0 me-auto">{{ $filters.currency(item.price) }}</p>
              <!-- 讀取效果 -->
              <button
                type="button"
                class="btn btn-link link-dark ps-1"
                v-if="isLoading.itemID === item.id"
              >
                <div class="spinner-border spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
              <template v-else>
                <!-- 購物車按鈕 -->
                <button
                  type="button"
                  class="product__list__functionBtn btn btn-link p-2 me-1"
                  :class="{ disabled: isLoading.itemID }"
                  @click="addCart(item)"
                  v-if="!checkCartsData(item.id)"
                >
                  <img
                    src="@/assets/images/icon/bi-cart-plus.svg"
                    alt="addCart"
                    class="studio__icon"
                  />
                </button>
                <!-- 已加入購物車 -->
                <button type="button" class="btn btn-link link-dark p-2 me-1" v-else>
                  <img
                    src="@/assets/images/icon/bi-cart-check.svg"
                    alt="checkCart"
                    class="studio__icon"
                  />
                </button>
              </template>
            </div>
            <!-- 商品描述 -->
            <p class="mb-0">{{ item.description }}</p>
          </div>
        </li>
      </ul>
      <div class="d-flex justify-content-center mb-5">
        <Page
          :pages="totalPages"
          :currentPage="currentPage"
          @display-page="changeDisplayData"
        />
      </div>
    </section>
    <Toast ref="toast"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      cartsData: [],
      category: '',
      localStorageProductID: [],
      totalPages: 0,
      currentPage: 1,
      finalDisplayData: [],
    };
  },
  emits: ['update'],
  props: ['cartsUpdate'],
  methods: {
    getProductsAll() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading.status = true;
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.changeDisplayData();
            this.isLoading.status = false;
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法取得商品全部資料喔～', 'error');
        });
    },
    getCartsList() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.cartsData = res.data.data.carts;
            this.isLoading.itemID = '';
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法取得購物車清單喔～', 'error');
        });
    },
    addCart(item) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const productData = { data: { product_id: item.id, qty: 1 } };
      // 加入商品時打開讀取效果
      this.isLoading.itemID = item.id;
      this.axios
        .post(apiUrl, productData)
        .then((res) => {
          if (res.data.success) {
            this.$emit('update');
            // 當商品已存在購物車時，才關掉讀取效果
            this.getCartsList();
            this.$refs.toast.showToast(`『${item.title}』${res.data.message}`);
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法加入購物車喔～', 'error');
        });
    },
    clickCategory(key) {
      this.category = key;
      window.scrollTo(0, 0);
      this.changeDisplayData();
    },
    setLocalStorage(item) {
      if (this.localStorageProductID[0]) {
        let dataIndex = null;
        this.localStorageProductID.forEach((prodcutID, index) => {
          if (prodcutID === item.id) {
            dataIndex = index;
          }
        });
        if (dataIndex === null) {
          this.localStorageProductID.push(item.id);
          localStorage.setItem('myFavorite', JSON.stringify(this.localStorageProductID));
          this.$emit('update');
          this.$refs.toast.showToast(`已將『${item.title}』加到我的最愛囉!`);
        } else {
          this.localStorageProductID.splice(dataIndex, 1);
          localStorage.setItem('myFavorite', JSON.stringify(this.localStorageProductID));
          this.$emit('update');
          this.$refs.toast.showToast(`『${item.title}』，已從我的最愛移除囉!`, 'error');
        }
      } else {
        this.localStorageProductID.push(item.id);
        localStorage.setItem('myFavorite', JSON.stringify(this.localStorageProductID));
        this.$emit('update');
        this.$refs.toast.showToast(`已將『${item.title}』加到我的最愛囉!`);
      }
    },
    checkCartsData(id) {
      const tempData = this.cartsData.filter((item) => item.product_id === id);
      let isExist = false;
      if (tempData[0]) {
        isExist = true;
      }
      return isExist;
    },
    changeDisplayData(page = 1) {
      const n = 12;
      this.totalPages = Math.ceil(this.filterCategory.length / n);
      this.currentPage = page;
      // slice(起始位置, 結束位置)，實際擷取到結束位置前一個元素(0, 8)(8, 16)
      this.finalDisplayData = this.filterCategory.slice(n * page - n, n * page);
    },
  },
  created() {
    this.getProductsAll();
    this.getCartsList();
  },
  mounted() {
    this.localStorageProductID = JSON.parse(localStorage.getItem('myFavorite')) || [];
  },
  computed: {
    // 目前的分類資料
    filterCategory() {
      return this.products.filter((item) => item.category.match(this.category));
    },
    categoryData() {
      const category = {};
      this.products.forEach((item) => {
        if (category[item.category] === undefined) {
          category[item.category] = {};
          category[item.category].count = 1;
          switch (item.category) {
            case '餐點':
              category[item.category].icon = 'restaurant';
              break;
            case '有氧':
              category[item.category].icon = 'accessibility_new';
              break;
            case '阻力':
              category[item.category].icon = 'fitness_center';
              break;
            case '飲品':
              category[item.category].icon = 'local_drink';
              break;
            default:
              break;
          }
        } else {
          category[item.category].count += 1;
        }
      });
      return category;
    },
  },
  watch: {
    cartsUpdate(value) {
      if (value) {
        this.getCartsList();
      }
    },
  },
};
</script>
