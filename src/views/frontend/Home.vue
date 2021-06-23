<template>
  <!-- banner -->
  <figure class="position-relative mb-5">
    <img src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=1080" alt="維克健身餐飲複合工作室" class="studio__banner">
    <div class="position-absolute top-50 start-25 translate-middle mt-5 ps-4">
      <h1 class=" text-white display-3 fw-bolder mb-3">
        維克健身餐飲<br>複合工作室
      </h1>
      <button type="button" class="btn btn-primary"><span class="display-6">立即體驗</span></button>
    </div>
  </figure>
  <!-- 工作室目標 -->
  <section class="container mb-5">
    <h2 class="text-center mb-5">工作室目標</h2>
    <ul class="studio__goal list-unstyled">
      <!-- 吃得健康 -->
      <li class="row align-items-center mb-5">
        <div class="col d-flex">
          <img src="https://images.unsplash.com/photo-1564464392342-54692a5d59a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80" alt="減脂餐(豬肉)" class="w-100 rounded">
        </div>
        <div class="col d-flex">
          <div class="text-center ms-5 ps-5">
            <h3>吃得健康</h3>
            <p class="mb-0">三分練，七分吃</p>
            <p class="px-3">增肌減脂都適合</p>
          </div>
        </div>
      </li>
      <!-- 一對一訓練 -->
      <li class="row d-flex flex-row-lg-reverse align-items-center mb-5">
        <div class="col d-flex justify-content-center justify-content-lg-end">
          <div class="text-center me-lg-5 pe-lg-5">
            <h3>一對一訓練</h3>
            <p>讓專業教練打造更好的自己</p>
          </div>
        </div>
        <div class="col">
          <img src="https://images.unsplash.com/flagged/photo-1566064336477-864e4f308992?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="減脂餐(豬肉)" class="w-100 rounded">
        </div>
      </li>
      <!-- 吃得健康 -->
      <li class="row align-items-center mb-5">
        <div class="col d-flex">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" alt="減脂餐(豬肉)" class="w-100 rounded">
        </div>
        <div class="col d-flex">
          <div class="text-center ms-5 ps-5">
            <h3>團課訓練</h3>
            <p class="mb-0">動作教學、有氧活動</p>
            <p>找到有共同興趣的同伴</p>
          </div>
        </div>
      </li>
    </ul>
  </section>
  <!-- 專業團隊 -->
  <section class="container-fluid bg-dark mb-5 pt-5 pb-3">
    <div class="container">
      <h2 class="text-center text-white mb-5">專業團隊</h2>
      <ul class="studio__team list-unstyled row row-cols-2 row-cols-lg-4">
        <li class="col" v-for="(item, key) in team" :key="item.name + key">
          <div class="card d-flex align-items-center bg-dark">
            <img :src="item.imageUrl" class="card-img-top" :alt="item.name">
            <div class="card-body text-center">
              <p class="card-text fw-bold mb-0 text-white">{{item.name}}</p>
              <p class="card-text text-white">{{item.job}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <!-- 商品選擇 -->
  <section class="studio__productSelect mb-5">
    <h2 class="text-center mb-3">今天想選擇甚麼?</h2>
    <div class="row justify-content-center">
      <div class="product--hover col-5" v-for="item in randomData" :key="item.id">
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
</template>

<script>
export default {
  data() {
    return {
      products: [],
      randomData: [],
      team: [
        {
          name: 'Vic',
          imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          job: '工作室創立人',
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
  },
  created() {
    this.getProductsAll();
  },
};
</script>
