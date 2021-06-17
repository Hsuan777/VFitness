<template>
  <loading :active="isLoading.status"></loading>
  <h2 class="h3 mb-0 py-2">文章列表</h2>
  <div class="d-flex align-items-center py-2">
    <input type="button" value="新增" class="btn btn-primary me-2"
      @click="openArticleModal(this.article)">
    <page :pages="totalPages" :currentPage="currentPage" @display-page="getArticles"
    class="me-2"></page>
    <div class="input-group">
      <span class="input-group-text">搜尋文章名稱</span>
      <search @filter-data="getFilterData"></search>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>標題</th>
        <th>描述</th>
        <th>作者</th>
        <th>是否啟用</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in articles"
        :key="item.create_at"
        :class="{ 'table-success': item.isPublic }"
      >
        <td>{{ item.title }}</td>
        <td class="text-start">{{ item.description }}</td>
        <td>{{ item.author }}</td>
        <td>
          <div class="form-check form-switch d-flex justify-content-center">
            <input
              class="form-check-input me-2"
              type="checkbox"
              :id="item.id"
              :checked="item.isPublic"
              @change="getArticle(item.id, 'isPublic')"
            />
            <label class="form-check-label" :for="item.id">
              {{ item.isPublic ? "已啟用" : "未啟用" }}
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
              class="btn btn-secondary"
              :class="{ disabled: item.isPublic }"
              @click="getArticle(item.id, 'edit')"
            >
              修改
            </button>
            <input
              type="button"
              value="刪除"
              class="btn btn-outline-danger border-secondary"
              :class="{ disabled: item.isPublic }"
              @click="openDeleteModal(item)"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <article-modal ref="articleModal" :article-data="tempArticle"
    @update="getArticles"></article-modal>
  <del-modal ref="deleteModal" :data="tempArticle.title" tab="文章" @delete-data="deleteArticle">
  </del-modal>
</template>

<script>
import articleModal from '../../components/backendModal/articleModal.vue';
import delModal from '../../components/backendModal/deleteModal.vue';

export default {
  data() {
    return {
      isLoading: {
        itemID: '',
        status: false,
      },
      articles: [],
      article: {
        title: '',
        author: '',
        content: '',
        description: '',
        tag: [],
      },
      tempArticle: {},
      currentPage: 1,
      totalPages: 0,
      searchData: '',
    };
  },
  methods: {
    getArticles(page = 1) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.isLoading.status = true;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          this.articles = res.data.articles;
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.status = false;
      }).catch(() => {
        this.swal('無法取得資料喔～快去看什麼問題吧！', 'error');
      });
    },
    // 修改與啟用先取得資料
    getArticle(itemId, action) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${itemId}`;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          if (action === 'isPublic') {
            this.putArticle(res.data.article, action);
          } else if (action === 'edit') {
            this.openArticleModal(res.data.article);
          }
        } else {
          this.swal(res.data.message, 'error');
        }
      }).catch((res) => {
        this.swal('無法取得資料喔～快去看什麼問題吧！', 'error');
        console.log(res);
      });
    },
    // 更新是否啟用
    putArticle(item, action) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
      const articleObj = { data: { ...item } };
      this.isLoading.itemID = item.id;
      if (action === 'isPublic') {
        articleObj.data.isPublic = !articleObj.data.isPublic;
      }
      this.axios.put(apiUrl, articleObj).then((res) => {
        if (res.data.success) {
          this.getArticles();
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.itemID = '';
      }).catch(() => {
        this.swal('無法修改資料喔～快去看什麼問題吧！', 'error');
      });
    },
    deleteArticle() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.isLoading.itemID = this.tempArticle.id;
      this.axios.delete(apiUrl).then((res) => {
        if (res.data.success) {
          this.$refs.deleteModal.hideModal();
          this.getArticles();
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message, 'error');
        }
        this.isLoading.itemID = '';
      }).catch((res) => {
        this.swal('無法刪除資料喔～快去看什麼問題吧！', 'error');
        console.log(res);
      });
    },
    openArticleModal(item) {
      this.tempArticle = { ...item };
      if (!this.tempArticle.tag) {
        this.tempArticle.tag = [];
      }
      this.$refs.articleModal.showModal();
    },
    openDeleteModal(item) {
      this.tempArticle = { ...item };
      this.$refs.deleteModal.showModal();
    },
    getFilterData(data) {
      this.searchData = data;
    },
  },
  created() {
    this.getArticles();
  },
  components: {
    articleModal,
    delModal,
  },
  computed: {
    filterData() {
      return this.coupons.filter((item) => item.code.match(this.searchData));
    },
  },
};
</script>
