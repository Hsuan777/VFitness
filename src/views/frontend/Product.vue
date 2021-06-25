<template>
  <div>
    <loading :active="isLoading.status"></loading>
    <!-- 產品區 -->
    <section class="product__inside container border-bottom my-5 pb-5">
      <div class="row">
        <!-- 產品左半 -->
        <div class="col-lg-5 mb-5">
          <span class="badge bg-primary">{{product.category}}</span>
          <h1 class="border-bottom border-secondary py-3 mb-3">{{product.title}}
          </h1>
          <p class="mb-3">{{product.description}}</p>
          <img :src="product.imageUrl" :alt="product.title" class="rounded">
        </div>
        <!-- 產品右半 -->
        <div class="col-lg-7">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-4 pb-1">
              <li class="breadcrumb-item">
                <router-link to="/productsList">餐飲與課程</router-link>
              </li>
              <li class="breadcrumb-item active">{{product.title}}</li>
            </ol>
          </nav>
          <div class="row g-3">
            <!-- options -->
            <div class="col-6">
              <!-- 營養標示 -->
              <template v-if="product.category === '餐點' || product.category === '飲品'">
                <h2 class="h4 text-center border-bottom border-secondary mb-3 pt-2 pb-3">營養標示</h2>
                <ul>
                  <li>
                    <p class="mb-1">卡路里：{{product.options.food.calories}} 大卡</p>
                  </li>
                  <li>
                    <p class="mb-1">碳水化合物：{{product.options.food.carbs}} 公克</p>
                  </li>
                  <li>
                    <p class="mb-1">蛋白質：{{product.options.food.protein}} 公克</p>
                  </li>
                  <li>
                    <p>脂肪：{{product.options.food.fat}} 公克</p>
                  </li>
                </ul>
              </template>
              <!-- 課程資訊  -->
              <template v-else>
                <h2 class="h4 text-center border-bottom border-secondary mb-3 pt-2 pb-3">課程資訊</h2>
                <ul>
                  <li>
                    <p class="mb-1">難易程度：{{product.options.course.stars}}</p>
                  </li>
                  <li>
                    <p class="mb-1">課程時間：{{product.options.course.duration}} 分鐘</p>
                  </li>
                  <li>
                    <p class="mb-1">授課老師：{{product.options.course.teacher}}</p>
                  </li>
                  <li>
                    <p>上課區域：{{product.options.course.area}}</p>
                  </li>
                </ul>
              </template>
            </div>
            <!-- content 內容物、主要內容 -->
            <div class="col-6">
              <h2 class="h4 text-center border-bottom border-secondary mb-3 pt-2 pb-3">內容</h2>
              <p>{{product.content}}</p>
            </div>
            <!-- 售價 -->
            <div class="col-6">
              <h2 class="h4 text-center border-bottom border-secondary pt-2 pb-3">售價</h2>
              <p class="h5 fw-normal text-center h-50
                d-flex justify-content-center align-items-center">
                <span>一{{ product.unit }} $ {{product.price}}</span>
              </p>
            </div>
            <!-- 注意事項 -->
            <div class="col-6">
              <p class="mt-5 pt-1">注意事項 :<br>
                <template v-if="product.category === '餐點'">
                  <span>餐點均為當日現做。</span><br>
                  <span>可選口味，海苔、孜然、莎莎醬，請在備註說明。</span>
                </template>
                <template v-else-if="product.category === '有氧' || product.category === '阻力'">
                  <span>請提早到上課地點，避免您的權益損失。</span><br>
                  <span>如需請假，請提前三小時與我們聯絡。</span>
                </template>
                <template v-else>
                  飲品均為現做，請儘速飲用完畢。
                </template>
              </p>
            </div>
            <!-- 購物車按鈕群組 -->
            <div class="col-md-6">
              <div class="d-flex">
                <div class="spinner-border text-primary me-auto" role="status"
                  v-if="isLoading.itemID">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="input-group me-3" v-else>
                  <button class="btn btn-outline-primary border-secondary" type="button"
                  @click="cartsOfProduct[0].qty -= 1"
                  :disabled="cartsOfProduct[0].qty - 1 === 0"> - </button>
                  <input type="text" class="form-control text-center bg-white"
                  v-model="cartsOfProduct[0].qty" disabled>
                  <button class="btn btn-outline-primary" type="button"
                  @click="cartsOfProduct[0].qty += 1"> + </button>
                </div>
                <input type="button" value="更新購物車" class="btn btn-primary"
                @click="putCart(cartsOfProduct[0])" v-if="cartsOfProduct[0].id">
                <input type="button" value="加入購物車" class="btn btn-primary"
                @click="addCart(product.id, cartsOfProduct[0].qty)" v-else>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 額外產品 -->
    <section class="product__list container mb-5">
      <p class="h3">您可能也會有興趣 :</p>
      <ul class="list-unstyled row g-1 row-cols-2 row-cols-md-4">
        <li class="product--hover col" v-for="item in randomData" :key="item.id">
          <div class="card card-body border-0">
            <router-link :to="`/product/${item.id}`"
            class="text-decoration-none link-dark stretched-link">
                <img :src="item.imageUrl" alt="item.title"
                class="product__list__img mb-2 rounded-3">
            </router-link>
            <h3 class="h4 mb-0">{{item.title}}</h3>
          </div>
        </li>
      </ul>
    </section>
    <subscribe></subscribe>
  </div>
</template>

<script>
import subscribe from '../../components/frontend/Subscribe.vue';

export default {
  data() {
    return {
      products: [],
      randomData: [],
      product: {
        options: {
          food: {
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
          },
          course: {
            stars: '',
            duration: 0,
            teacher: '',
            area: '',
          },
        },
      },
      cartsOfProduct: [{
        qty: 1,
      }],
    };
  },
  emits: ['update'],
  props: ['cartsUpdate'],
  methods: {
    getProductsAll() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios.get(apiUrl).then((res) => {
        this.isLoading.status = false;
        if (res.data.success) {
          this.products = res.data.products;
          this.randomProduct();
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法取得商品全部資料喔～', 'error');
      });
    },
    getProduct() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`;
      this.isLoading.status = true;
      this.axios.get(apiUrl).then((res) => {
        this.isLoading.status = false;
        if (res.data.success) {
          this.product = res.data.product;
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法取得產品資料喔～', 'error');
      });
    },
    checkCartsList() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          const cartsData = res.data.data;
          let cartsOfProduct = [];
          this.cartsOfProduct = [{ qty: 1 }];
          cartsOfProduct = cartsData.carts
            .filter((item) => item.product.id === this.$route.params.id);
          if (cartsOfProduct[0]) {
            this.cartsOfProduct = [...cartsOfProduct];
          }
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch((res) => {
        console.log(res);
        this.swal('無法取得購物車資料喔～', 'error');
      });
    },
    addCart(itemID, num) {
      this.isLoading.itemID = itemID;
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const productData = { data: { product_id: itemID, qty: num } };
      this.axios.post(apiUrl, productData).then((res) => {
        if (res.data.success) {
          this.isLoading.itemID = '';
          // 觸發父層元件之函式，但在這得先定義 emits
          this.$emit('update');
          this.swal(res.data.message);
          this.checkCartsList();
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法加入購物車喔～', 'error');
      });
    },
    putCart(item) {
      // 必須是購物車 ID 作為 apiUrl，去更新購物車商品
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const productData = { data: { product_id: item.product_id, qty: item.qty } };
      this.isLoading.itemID = item.id;
      this.axios.put(apiUrl, productData).then((res) => {
        if (res.data.success) {
          this.$emit('update');
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.itemID = '';
      }).catch(() => {
        this.swal('無法更新購物車資料喔～', 'error');
      });
    },
    randomNumber(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomProduct() {
      const tempData = this.products;
      this.randomData = [];
      for (let x = 0; x < 4; x += 1) {
        const y = this.randomNumber(tempData.length, 0);
        this.randomData.push(this.products[y]);
        tempData.splice(y, 1);
      }
    },
    clickSubscribe() {
      this.swal('感謝您的訂閱');
    },
  },
  components: {
    subscribe,
  },
  created() {
    this.getProductsAll();
    this.getProduct();
    this.checkCartsList();
  },
  watch: {
    // 在產品內頁點選購物車中連結時，切換產品
    $route(to) {
      if (this.product.id !== to.params.id && to.name === 'Product') {
        this.getProductsAll();
        this.getProduct();
        this.checkCartsList();
      }
    },
    cartsUpdate(value) {
      if (value) {
        this.checkCartsList();
      }
    },
  },
};
</script>
