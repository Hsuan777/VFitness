<template>
  <!-- 置頂導覽列 -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
    <div class="container position-relative">
      <router-link to="/" class="logo navbar-brand d-flex align-items-center">
        <span class="h3 mb-0 pt-1">VFitness</span>
        <div class="flex-column ms-1">
          <span class="logo__icon material-icons d-block">fitness_center</span>
          <span class="logo__icon material-icons d-block">restaurant</span>
        </div>
      </router-link>
      <!-- mobile 直接進購物車頁面 -->
      <div class="navbar-nav ms-auto me-3">
        <router-link to="/checkout"
          class="nav-link d-lg-none d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            class="bi bi-cart-check me-2" viewBox="0 0 16 16">
            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0
              1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2
            2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0
            .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102
            4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2
            0 1 1 0 0 1 2 0z"/>
          </svg>
          購物車(<span class="text-white">{{cartsCount}}</span>)
        </router-link>
      </div>
      <!-- mobile 折疊按鈕 -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
      aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto d-flex align-items-center">
          <router-link to="/about" class="nav-link">關於我們</router-link>
          <span class="d-none d-lg-block text-white pb-1">|</span>
          <router-link to="/questions" class="nav-link">常見問答</router-link>
          <span class="d-none d-lg-block text-white pb-1">|</span>
          <router-link to="/productsList" class="nav-link">
            餐飲與課程
          </router-link>
          <span class="d-none d-lg-block text-white pb-1">|</span>
          <a class="nav-link btn btn-link link-dark d-none d-lg-flex align-items-center"
          href="#cartContent" data-bs-toggle="dropdown" data-bs-display="static" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            class="bi bi-cart-check text-white me-2" viewBox="0 0 16 16">
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0
               1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2
              2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0
              .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102
              4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2
              0 1 1 0 0 1 2 0z"/>
            </svg>
            購物車(<span class="text-white">{{cartsCount}}</span>)
              TWD$ {{$filters.currency(cartsData.total)}}
          </a>
          <!-- 購物車內容 -->
          <div id="cartContent" ref="cartsComponent" class="dropdown-menu dropdown-menu-end me-2">
            <carts :carts-data="cartsData" @update="getCartsList"></carts>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <router-view class="main" :carts-update="isUpdate" @update="getCartsList"/>
  <footer class="container-fluid bg-primary py-3">
    <div class="container">
      <div class="row">
        <!-- 導覽列 -->
        <div class="col-lg-6">
          <nav class="navbar-dark">
            <div class="navbar-nav flex-row align-items-center">
              <router-link to="/about" class="nav-link">關於我們</router-link>
              <span class="text-white pb-1 mx-2">|</span>
              <router-link to="/questions" class="nav-link">常見問答</router-link>
              <span class="text-white pb-1 mx-2">|</span>
              <router-link to="/productsList" class="nav-link">
                餐飲與課程
              </router-link>
            </div>
          </nav>
        </div>
        <!-- 社群 icon -->
        <div class="col-lg-6 mb-2 mb-lg-0">
          <div class="d-flex justify-content-lg-end">
            <a href="https://www.facebook.com/" target="_block">
              <img src="../../assets/images/ic_social_fb.svg" alt="FB">
            </a>
            <a href="https://www.instagram.com/" target="_block" class="mx-3">
              <img src="../../assets/images/ic_social_ig.svg" alt="IG">
            </a>
            <a href="https://line.me/zh-hant/" target="_block">
              <img src="../../assets/images/ic_social_line.svg" alt="LINE">
            </a>
          </div>
        </div>
        <!-- 店家資訊 -->
        <div class="col mb-2">
          <nav class="navbar-dark">
            <div class="navbar-nav">
              <a href="tel:0800-080-000" class="nav-link py-0">電話：0800-080-000</a>
              <a href="https://www.google.com.tw/maps/search/%E6%A1%83%E5%9C%92%E5%B8%82%E6%A1%83%E5%9C%92%E5%8D%80%E5%A4%A7%E6%9C%89%E4%B8%83%E8%A1%97333%E8%99%9F/@25.0155502,121.2992199,15z/data=!3m1!4b1?hl=zh-TW" class="nav-link py-0" target="_block">地址：桃園市桃園區大有七街333號</a>
            </div>
          </nav>
        </div>
        <!-- LOGO -->
        <div class="col-12">
          <router-link to="/"
            class="logo d-flex align-items-center text-white text-decoration-none">
            <span class="h3 mb-0 pt-1">VFitness</span>
            <div class="flex-column ms-1">
              <span class="logo__icon material-icons d-block">fitness_center</span>
              <span class="logo__icon material-icons d-block">restaurant</span>
            </div>
          </router-link>
          <p class="text-secondary mb-0">Copyright © 2021 All rights reserved</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import carts from '../../components/frontend/Carts.vue';

export default {
  data() {
    return {
      cartsData: {
        carts: [],
      },
      isUpdate: '',
    };
  },
  methods: {
    getCartsList() {
      this.isUpdate = '1';
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(apiUrl).then((res) => {
        this.isUpdate = '';
        if (res.data.success) {
          this.cartsData = res.data.data;
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch(() => {
        this.swal('無法取得購物車清單喔～', 'error');
      });
    },
  },
  components: {
    carts,
  },
  computed: {
    cartsCount() {
      let count = 0;
      this.cartsData.carts.forEach((item) => {
        count += item.qty;
      });
      return count;
    },
  },
  created() {
    this.getCartsList();
  },
};
</script>
