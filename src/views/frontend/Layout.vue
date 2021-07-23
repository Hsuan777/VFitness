<template>
  <div>
    <!-- 置頂導覽列 -->
    <ScorllTop/>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div class="container position-relative">
        <router-link
          to="/"
          class="logo navbar-brand d-flex align-items-center"
          @click="closeCollapseNavbar"
        >
          <span class="h3 mb-0 pt-1">VFitness</span>
          <div class="flex-column ms-1">
            <span class="logo__icon material-icons d-block">fitness_center</span>
            <span class="logo__icon material-icons d-block">restaurant</span>
          </div>
        </router-link>
        <!-- mobile 直接進購物車頁面 -->
        <div class="navbar-nav ms-auto me-3">
          <router-link
            to="/checkout"
            class="nav-link d-lg-none d-flex align-items-center"
            @click="closeCollapseNavbar"
          >
            <img
              src="@/assets/images/icon/bi-cart-check-white.svg"
              alt="addCart"
              class="studio__icon__nav me-2"
            />
            購物車(<span class="text-white">{{ cartsCount }}</span
            >)
          </router-link>
        </div>
        <!-- mobile 折疊按鈕 -->
        <button
          class="navbar-toggler"
          type="button"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="openCollapseNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div ref="collapseNavbar" class="collapse navbar-collapse">
          <div class="navbar-nav ms-auto d-flex align-items-center">
            <!-- 訂單查詢 -->
            <input
              type="button"
              value="訂單查詢"
              class="studio__topNavbar__link nav-link btn btn-link"
              @click="openTrackModal"
            />
            <span class="d-none d-lg-block text-white pb-1">|</span>
            <!-- 關於我們 -->
            <router-link
              to="/about"
              class="studio__topNavbar__link nav-link"
              @click="closeCollapseNavbar"
              >關於我們</router-link
            >
            <span class="d-none d-lg-block text-white pb-1">|</span>
            <!-- 常見問答 -->
            <router-link
              to="/questions"
              class="studio__topNavbar__link nav-link"
              @click="closeCollapseNavbar"
              >常見問答</router-link
            >
            <span class="d-none d-lg-block text-white pb-1">|</span>
            <!-- 餐飲與課程 -->
            <router-link
              to="/productsList"
              class="studio__topNavbar__link nav-link"
              @click="closeCollapseNavbar"
            >
              餐飲與課程
            </router-link>
            <span class="d-none d-lg-block text-white pb-1">|</span>
            <!-- 我的最愛 -->
            <router-link
              to="/bookMark"
              class="studio__topNavbar__link nav-link"
              @click="closeCollapseNavbar"
            >
              我的最愛(<span class="text-white">{{ localStorageProductID.length }}</span
              >)
            </router-link>
            <span class="d-none d-lg-block text-white pb-1">|</span>
            <!-- 購物車 -->
            <a
              class="nav-link link-dark d-none d-lg-flex align-items-center"
              href="#cartsContent"
              data-bs-toggle="dropdown"
              data-bs-display="static"
            >
              <img
                src="@/assets/images/icon/bi-cart-check-white.svg"
                alt="addCart"
                class="studio__icon__nav me-2"
              />
              購物車(<span class="text-white">{{ cartsCount }}</span
              >) TWD$ {{ $filters.currency(cartsData.total) }}
            </a>
            <!-- 購物車內容 -->
            <div
              id="cartsContent"
              ref="cartsComponent"
              class="dropdown-menu dropdown-menu-end me-2"
            >
              <Carts :carts-data="cartsData" @update="getCartsList"/>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- router-view  -->
    <router-view
      class="main"
      :carts-update="isUpdate"
      @update="updateData"
      @click="closeCollapseNavbar"
    />
    <!-- footer -->
    <footer class="container-fluid bg-primary py-3">
      <div class="container">
        <div class="row">
          <!-- 導覽列 -->
          <div class="col-lg-6">
            <nav class="navbar-dark">
              <div class="navbar-nav flex-row align-items-center">
                <router-link to="/about" class="nav-link" @click="closeCollapseNavbar">
                  關於我們
                </router-link>
                <span class="text-white pb-1 mx-1 mx-sm-2">|</span>
                <router-link to="/questions" class="nav-link" @click="closeCollapseNavbar">
                  常見問答
                </router-link>
                <span class="text-white pb-1 mx-1 mx-sm-2">|</span>
                <router-link to="/productsList" class="nav-link" @click="closeCollapseNavbar">
                  餐飲與課程
                </router-link>
                <span class="text-white pb-1 mx-1 mx-sm-2">|</span>
                <router-link to="/bookMark" class="nav-link" @click="closeCollapseNavbar">
                  我的最愛
                </router-link>
              </div>
            </nav>
          </div>
          <!-- 社群 icon -->
          <div class="col-lg-6 mb-2 mb-lg-0">
            <div class="d-flex justify-content-lg-end">
              <a href="https://www.facebook.com/" target="_block">
                <img src="@/assets/images/icon/ic_social_fb.svg" alt="FB" />
              </a>
              <a href="https://www.instagram.com/" target="_block" class="mx-3">
                <img src="@/assets/images/icon/ic_social_ig.svg" alt="IG" />
              </a>
              <a href="https://line.me/zh-hant/" target="_block">
                <img src="@/assets/images/icon/ic_social_line.svg" alt="LINE" />
              </a>
            </div>
          </div>
          <!-- 店家資訊 -->
          <div class="col mb-2">
            <nav class="navbar-dark">
              <div class="navbar-nav">
                <a href="tel:0800-080-000" class="nav-link py-0">電話：0800-080-000</a>
                <a
                  href="https://www.google.com.tw/maps/search/%E6%A1%83%E5%9C%92%E5%B8%82%E6%A1%83%E5%9C%92%E5%8D%80%E5%A4%A7%E6%9C%89%E4%B8%83%E8%A1%97333%E8%99%9F/@25.0155502,121.2992199,15z/data=!3m1!4b1?hl=zh-TW"
                  class="nav-link py-0"
                  target="_block"
                  >地址：桃園市桃園區大有七街333號</a
                >
              </div>
            </nav>
          </div>
          <!-- LOGO -->
          <div class="col-12">
            <router-link
              to="/"
              class="logo d-flex align-items-center text-white text-decoration-none"
            >
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
    <TrackModal ref="trackModal"/>
    <Toast ref="toast"/>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import Carts from '@/components/frontend/Carts.vue';
import TrackModal from '@/components/frontend/TrackModal.vue';
import ScorllTop from '@/components/tools/ScorllTop.vue';

export default {
  data() {
    return {
      cartsData: {
        carts: [],
      },
      isUpdate: '',
      localStorageProductID: [],
      collapse: {},
    };
  },
  methods: {
    getCartsList(messageObj) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isUpdate = '1';
      this.axios
        .get(apiUrl)
        .then((res) => {
          this.isUpdate = '';
          if (res.data.success) {
            this.cartsData = res.data.data;
            if (messageObj) {
              this.$refs.toast.showToast(messageObj.message, messageObj.status);
            }
          } else {
            this.$refs.toast.showToast('無法取得購物車清單喔!', 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('請重新整理頁面，謝謝。', 'error');
        });
    },
    updateData() {
      this.getCartsList();
      this.localStorageProductID = JSON.parse(localStorage.getItem('myFavorite')) || [];
    },
    openTrackModal() {
      this.$refs.trackModal.showModal();
      this.closeCollapseNavbar();
    },
    openCollapseNavbar() {
      this.collapse.toggle();
    },
    closeCollapseNavbar() {
      this.collapse.hide();
    },
  },
  components: {
    Carts,
    TrackModal,
    ScorllTop,
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
    this.updateData();
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapseNavbar, {
      toggle: false,
    });
  },
};
</script>
