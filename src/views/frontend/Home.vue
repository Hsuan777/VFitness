<template>
  <!-- banner -->
  <figure class="studio__banner d-flex align-items-center mb-5">
    <div class="container mt-5">
      <h1 class="text-white display-3 fw-bolder mb-3">
        維克健身餐飲<br>複合工作室
      </h1>
      <button type="button" class="btn btn-primary"><span class="display-7"
        @click="addCart('-McmoIyQylGhUmoGMWBX', 1)">立即體驗</span></button>
    </div>
  </figure>
  <!-- 工作室目標 -->
  <section class="container mb-5">
    <h2 class="text-center fw-bolder mb-3 mb-md-4 mb-lg-5">工作室目標</h2>
    <ul class="studio__goal list-unstyled">
        <!-- 吃得健康 -->
      <li class="row flex-row-reverse align-items-center mb-5">
        <div class="col-md-6 col-lg-5 d-flex flex-column justify-content-center align-items-center">
          <h3>吃得健康</h3>
          <p>三分練，七分吃，增肌減脂都適合</p>
        </div>
        <div class="col-md-6 col-lg-7">
          <img src="https://images.unsplash.com/photo-1564464392342-54692a5d59a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" alt="減脂餐(豬肉)" class="w-100 rounded">
        </div>
      </li>
      <!-- 一對一訓練 -->
      <li class="row align-items-center mb-5">
        <div class="col-md-6 col-lg-5 d-flex flex-column justify-content-center align-items-center">
          <h3>一對一訓練</h3>
          <p>讓專業教練打造更好的自己</p>
        </div>
        <div class="col-md-6 col-lg-7">
          <img src="https://images.unsplash.com/flagged/photo-1566064336477-864e4f308992?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" alt="一對一訓練" class="w-100 rounded">
        </div>
      </li>
      <!-- 團課訓練 -->
      <li class="row flex-row-reverse align-items-center mb-5">
        <div class="col-md-6 col-lg-5 d-flex flex-column justify-content-center align-items-center">
          <h3>團課訓練</h3>
          <p class="mb-0">動作教學、有氧活動</p>
          <p>找到有共同興趣的同伴</p>
        </div>
        <div class="col-md-6 col-lg-7">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" alt="團課訓練" class="w-100 rounded">
        </div>
      </li>
    </ul>
  </section>
  <!-- 專業團隊 -->
  <section class="container-fluid bg-dark mb-5 py-3 py-md-5">
    <div class="container">
      <h2 class="text-center text-white fw-bolder mb-3 mb-md-4 mb-lg-5">專業團隊</h2>
      <ul class="list-unstyled row g-4 row-cols-2 row-cols-lg-4 mb-0">
        <li class="col"
          v-for="(item, key) in team" :key="item.name + key">
          <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
            <img :src="item.imageUrl"
              class="studio__avatar me-lg-3 mb-2 mb-lg-0" :alt="item.name">
            <div class="text-center text-lg-start">
              <p class="h4 mb-0 text-white">{{item.name}}</p>
              <p class="mb-0 text-white">{{item.job}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <!-- 學員心得 -->
  <section class="container mb-5">
    <h2 class="text-center fw-bolder mb-3 mb-md-4 mb-lg-5">學員心得</h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
      <div class="col mb-3 mb-lg-0" v-for="(item, key) in experience" :key="item.name + key">
        <div class="studio__experience h-100 px-4 py-3">
          <div class="d-flex flex-column justify-content-center align-items-center ps-md-4">
            <img :src="item.imageUrl" :alt="item.name" class="studio__avatar mb-3">
            <p class="h3 mb-3">{{item.name}}</p>
          </div>
          <p class="pe-md-3 mb-0">{{item.description}}</p>
        </div>
      </div>
    </div>
  </section>
  <!-- 商品選擇 -->
  <section class="studio__productSelect mb-5">
    <h2 class="text-center fw-bolder mb-5">今天想選擇甚麼?</h2>
    <div class="row g-1 justify-content-center">
      <div class="product--hover col-6 col-lg-5" v-for="item in randomData" :key="item.id">
        <div class="card card-body border-0">
          <router-link :to="`/product/${item.id}`"
          class="text-decoration-none link-dark stretched-link">
              <img :src="item.imageUrl" alt="item.title"
              class="studio__goal w-100 mb-2 rounded-3">
          </router-link>
          <h3 class="h4 mb-0">{{item.title}}</h3>
        </div>
      </div>
    </div>
  </section>
  <subscribe></subscribe>
</template>

<script>
import subscribe from '../../components/frontend/Subscribe.vue';

export default {
  data() {
    return {
      products: [],
      randomData: [],
      team: [
        {
          name: 'Vic',
          imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          job: '創立人。教練',
        },
        {
          name: 'Jaron',
          imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          job: '專業教練',
        },
        {
          name: '柔柔',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          job: '瑜珈老師',
        },
        {
          name: 'Nick',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80',
          job: '專業廚師',
        },
      ],
      experience: [
        {
          name: 'Andy',
          imageUrl: 'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=786&q=80',
          description: '上班太忙沒時間運動，好在工作室的教練願意花時間幫我規劃時間，好讓我擠出時間又不會讓自己的生活過於緊湊。順帶一提，運動完後來一杯乳清真的很棒！',
        },
        {
          name: 'Vivian',
          imageUrl: 'https://images.unsplash.com/photo-1545912453-db258ca9b7b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
          description: '住附近剛好路過看到有這麼近的運動場所，上班壓力大，跟著瑜伽老師做運動讓身體輕鬆不少。運動完後，晚餐剛好拿一份減脂餐走，真是太便利了！',
        },
        {
          name: 'Abbie',
          imageUrl: 'https://images.unsplash.com/photo-1514626585111-9aa86183ac98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
          description: '每天都要來一杯手搖飲料的我，自從某次某體驗課後，讓我下定決心要戒飲料，跟教練溝通後，一週安排兩堂課，加上飲食配合餐點控制，順利瘦身也沒復胖。',
        },
        {
          name: 'John',
          imageUrl: 'https://images.unsplash.com/photo-1520409364224-63400afe26e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=358&q=80',
          description: '以前我對於外表很沒有自信，自從報名教學班後，逐漸對健身越來越有興趣，現在我不再對自己沒有信心，反而更願意嘗試新事物，健身可以說是改變我一生的興趣。',
        },
      ],
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
    addCart(itemID, num) {
      this.isLoading.itemID = itemID;
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const productData = { data: { product_id: itemID, qty: num } };
      this.axios.post(apiUrl, productData).then((res) => {
        if (res.data.success) {
          this.isLoading.itemID = '';
          // 觸發父層元件之函式，但在這得先定義 emits
          this.$emit('update');
          this.swal('感謝您的預約，再請您填寫資料');
          this.$router.push('/checkoutInfo');
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法加入購物車喔～', 'error');
      });
    },
    randomNumber(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomProduct() {
      this.randomData = [];
      const food = [];
      const course = [];
      this.products.forEach((item) => {
        if (item.category === '餐點') {
          food.push(item);
        } else if (item.category === '阻力' || item.category === '有氧') {
          course.push(item);
        }
      });
      this.randomData.push(food[this.randomNumber(food.length, 0)]);
      this.randomData.push(course[this.randomNumber(course.length, 0)]);
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
  },
};
</script>
