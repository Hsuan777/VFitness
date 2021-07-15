// 匯入 vue
import { createApp } from 'vue';

// 匯入 vee-validate 表單驗證
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules'; // 規則
import { localize, setLocale } from '@vee-validate/i18n'; // 語系
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'; // 繁體

// 匯入 axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// 匯入 vue-loading 讀取特效
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

// 匯入 Aos 動畫特效
import AOS from 'aos';
import 'aos/dist/aos.css';

// 匯入 VueSweetalert2 通知特效
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// 匯入 bootstrap
import 'bootstrap';
import './assets/styles/main.scss'; // bootstrap 客製化

// 匯入 CKEditor 文字編輯器
import CKEditor from '@ckeditor/ckeditor5-vue';

// 匯入 tools 元件
import Page from './components/tools/Pagination.vue';
import Search from './components/tools/Search.vue';
import Swal from './components/tools/Swal.vue'; // sweetalert2 通知回饋，匯入 mixins
import Toast from './components/tools/Toast.vue'; // toast 通知回饋

// 匯入 methods
import currency from './methods/filters'; // 千分號

import App from './App.vue';
import router from './router';

// 定義驗證規則，vee-validate 已匯入使用 defineRule
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// 設定 vee-validate 全域規則，，vee-validate 已匯入使用 configure
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // true，當輸入任何內容直接進行驗證
});

// 設定預設語系，vee-validate/i18n 已匯入使用 setLocale
setLocale('zh_TW');

const app = createApp(App);
// 在 Vue 全域加入此方法，$filters 為自訂名稱，$ 是方便辨識從全域來的
app.config.globalProperties.$filters = {
  currency,
};
app.use(VueAxios, axios);
app.use(router);
app.use(VueSweetalert2);
app.use(CKEditor);

// 註冊 vee-validate 三個元件
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

// 註冊 Loading 元件
app.component('Loading', Loading);

// 註冊 分頁元件
app.component('Page', Page);

// 註冊 搜尋輸入框元件
app.component('Search', Search);

// 註冊 toast 通知回饋
app.component('Toast', Toast);

app.mount('#app');

// 若與該元件的固有內容(data、methods內)有同名，則優先使用該元件內容
app.mixin({
  data() {
    return {
      isLoading: {
        itemID: '',
        status: false,
      },
    };
  },
  mixins: [Swal],
  created() {
    AOS.init();
  },
});
