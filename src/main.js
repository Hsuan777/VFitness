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

// 匯入 VueSweetalert2 通知特效
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// 匯入 bootstrap
import 'bootstrap';
import './assets/styles/main.scss'; // bootstrap 客製化

import App from './App.vue';
import router from './router';

// 定義驗證規則，vee-validate 已匯入使用 defineRule
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// 設定 vee-validate 全域規則，，vee-validate 已匯入使用 configure
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: false, // true，當輸入任何內容直接進行驗證
});

// 設定預設語系，vee-validate/i18n 已匯入使用 setLocale
setLocale('zh_TW');

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(VueSweetalert2);

// 註冊 vee-validate 三個全域元件
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('Loading', Loading);
app.mount('#app');
