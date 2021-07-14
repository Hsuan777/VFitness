<template>
  <div>
    <!-- banner -->
    <figure class="studio__banner studio__banner__home d-flex align-items-center mb-5">
      <div class="container mt-5">
        <h1 class="text-white display-3 fw-bolder mb-3">維克健身餐飲<br />複合工作室</h1>
        <button
          v-if="experienceClass[0]"
          type="button"
          class="btn btn-primary"
          :disabled="classIsExist"
          @click="addCart(experienceClass[0].id, 1)"
        >
          <span class="display-7">{{ classIsExist ? '已預約' : '立即體驗' }}</span>
        </button>
      </div>
    </figure>
    <!-- 工作室目標 -->
    <section class="container mb-5">
      <h2 class="text-center fw-bolder mb-3 mb-md-4 mb-lg-5">工作室目標</h2>
      <ul class="studio__goal list-unstyled">
        <!-- 吃得健康 -->
        <li class="row flex-row-reverse align-items-center mb-5">
          <div
            class="col-md-6 d-flex flex-column
            justify-content-center align-items-center"
          >
            <h3>吃得健康</h3>
            <p class="border-bottom pb-3 text-nowrap">三分練，七分吃，增肌減脂都適合</p>
            <p class="px-lg-5 mb-lg-0">
              主餐採用新鮮牛肉、豬肉或者雞肉，不加過多調味料，均以原型食物方式呈現在餐點中。再配合當季新鮮蔬菜與根莖類食材，佐上當日調製健康醬料，讓您每一餐都吃得安心，不會產生罪惡感。
            </p>
          </div>
          <div class="col-md-6">
            <img src="@/assets/images/home/food.jpg" alt="減脂餐(豬肉)" class="w-100 rounded" />
          </div>
        </li>
        <!-- 一對一訓練 -->
        <li class="row align-items-center mb-5">
          <div
            class="col-md-6 d-flex flex-column
            justify-content-center align-items-center"
          >
            <h3>一對一訓練</h3>
            <p class="border-bottom pb-3 text-nowrap">讓專業教練打造更好的自己</p>
            <p class="px-lg-5 mb-lg-0">
              想踏入健身運動，又不知該如何開始嗎?
              跟著我們的教練，從根本打好基礎，一步步帶您成為更棒的自己。若您已是有經驗者，想調整更好的動作，我們的專業教練也能快速找到您的問題點。
            </p>
          </div>
          <div class="col-md-6">
            <img src="@/assets/images/home/oneToone.jpg" alt="一對一訓練" class="w-100 rounded" />
          </div>
        </li>
        <!-- 團課訓練 -->
        <li class="row flex-row-reverse align-items-center mb-5">
          <div
            class="col-md-6 d-flex flex-column
            justify-content-center align-items-center"
          >
            <h3>團課訓練</h3>
            <p class="border-bottom pb-3 text-nowrap">動作教學、有氧活動</p>
            <p class="px-lg-5 mb-lg-0">
              若您下班下課，或者有任何時間不知該如何打發，歡迎參與我們的團課活動。我們有不同的主題，阻力動作或是有氧活動，讓您運動不無聊，也能認識同好。
              阻力將有專業教練帶您認識各種阻力器材，並教您基礎動作。有氧活動目前有有氧拳擊與瑜珈課程可供選擇。
            </p>
          </div>
          <div class="col-md-6">
            <img src="@/assets/images/home/groupClasses.jpg" alt="團課訓練" class="w-100 rounded" />
          </div>
        </li>
      </ul>
    </section>
    <!-- 專業團隊 -->
    <section class="container-fluid bg-dark mb-5 py-5">
      <div class="container">
        <h2 class="text-center text-white fw-bolder mb-4 mb-lg-5">專業團隊</h2>
        <ul class="list-unstyled row g-4 row-cols-2 row-cols-lg-4 mb-0">
          <li class="col" v-for="(item, key) in team" :key="item.name + key">
            <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
              <img
                :src="`${item.imageUrl}`"
                class="studio__avatar me-lg-3 mb-2 mb-lg-0"
                :alt="item.name"
              />
              <div class="text-center text-lg-start">
                <p class="h4 mb-0 text-white">{{ item.name }}</p>
                <p class="mb-0 text-white">{{ item.job }}</p>
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
              <img :src="item.imageUrl" :alt="item.name" class="studio__avatar mb-3" />
              <p class="h3 mb-3">{{ item.name }}</p>
            </div>
            <p class="pe-md-3 mb-0">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 商品選擇 -->
    <section class="studio__productSelect mb-5">
      <h2 class="text-center fw-bolder mb-5">今天想選擇甚麼?</h2>
      <div class="row g-1 justify-content-center">
        <div class="col-6 col-lg-5" v-for="item in randomData" :key="item.id">
          <div class="product--hover card card-body border-0">
            <router-link
              :to="`/product/${item.id}`"
              class="text-decoration-none link-dark stretched-link"
            >
              <img
                :src="item.imageUrl"
                alt="item.title"
                class="studio__goal w-100 mb-2 rounded-3"
              />
            </router-link>
            <h3 class="h4 mb-0">{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </section>
    <Subscribe></Subscribe>
    <Toast ref="toast"></Toast>
  </div>
</template>

<script>
import founder from '@/assets/images/home/founder.jpg';
import coach from '@/assets/images/home/coach.jpg';
import yoga from '@/assets/images/home/yoga.jpg';
import chef from '@/assets/images/home/chef.jpg';
import student1 from '@/assets/images/home/student1.jpg';
import student2 from '@/assets/images/home/student2.jpg';
import student3 from '@/assets/images/home/student3.jpg';
import student4 from '@/assets/images/home/student4.jpg';
import Subscribe from '@/components/frontend/Subscribe.vue';

export default {
  data() {
    return {
      products: [],
      randomData: [],
      team: [
        {
          name: 'Vic',
          imageUrl: founder,
          job: '創立人。教練',
        },
        {
          name: 'Jaron',
          imageUrl: coach,
          job: '專業教練',
        },
        {
          name: '柔柔',
          imageUrl: yoga,
          job: '瑜珈老師',
        },
        {
          name: 'Nick',
          imageUrl: chef,
          job: '專業廚師',
        },
      ],
      experience: [
        {
          name: 'Andy',
          imageUrl: student1,
          description:
            '上班太忙沒時間運動，好在工作室的教練願意花時間幫我規劃時間，好讓我擠出時間又不會讓自己的生活過於緊湊。順帶一提，運動完後來一杯乳清真的很棒！',
        },
        {
          name: 'Vivian',
          imageUrl: student2,
          description:
            '住附近剛好路過看到有這麼近的運動場所，上班壓力大，跟著瑜伽老師做運動讓身體輕鬆不少。運動完後，晚餐剛好拿一份減脂餐走，真是太便利了！',
        },
        {
          name: 'Abbie',
          imageUrl: student3,
          description:
            '每天都要來一杯手搖飲料的我，自從某次某體驗課後，讓我下定決心要戒飲料，跟教練溝通後，一週安排兩堂課，加上飲食配合餐點控制，順利瘦身也沒復胖。',
        },
        {
          name: 'John',
          imageUrl: student4,
          description:
            '以前我對於外表很沒有自信，自從報名教學班後，逐漸對健身越來越有興趣，現在我不再對自己沒有信心，反而更願意嘗試新事物，健身可以說是改變我一生的興趣。',
        },
      ],
      experienceClass: [],
      classIsExist: false,
    };
  },
  emits: ['update'],
  props: ['cartsUpdate'],
  methods: {
    getProductsAll() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.experienceClass = this.products.filter((item) => item.title === '體驗課程');
            this.checkCartsList();
            this.randomProduct();
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法取得商品全部資料喔!', 'error');
        });
    },
    addCart(itemID, num) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const productData = { data: { product_id: itemID, qty: num } };
      this.axios
        .post(apiUrl, productData)
        .then((res) => {
          if (res.data.success) {
            this.$emit('update');
            this.$refs.toast.showToast('感謝您的預約! 畫面跳轉後再請您填寫資料。');
            setTimeout(() => {
              this.$router.push('/checkoutInfo');
            }, 3000);
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法加入購物車喔!', 'error');
        });
    },
    checkCartsList() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.success) {
            const cartsData = res.data.data;
            const cartsOfProduct = cartsData.carts.filter(
              (item) => item.product.id === this.experienceClass[0].id,
            );
            this.classIsExist = false;
            if (cartsOfProduct[0] === undefined) {
              return;
            }
            if (cartsOfProduct[0].product_id === this.experienceClass[0].id) {
              this.classIsExist = true;
            }
          } else {
            this.$refs.toast.showToast(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.$refs.toast.showToast('無法取得購物車資料喔!', 'error');
        });
    },
    randomNumber(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomProduct() {
      const food = [];
      const course = [];
      this.randomData = [];
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
  components: {
    Subscribe,
  },
  created() {
    this.getProductsAll();
  },
  watch: {
    cartsUpdate(value) {
      if (value) {
        this.getProductsAll();
      }
    },
  },
};
</script>
