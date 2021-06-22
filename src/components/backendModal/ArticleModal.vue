<template>
  <div
    class="modal fade"
    ref="articleModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="articleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" v-if="!tempArticle.id">新增文章</h5>
          <h5 class="modal-title" v-else>修改文章</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetForm"
          ></button>
        </div>
        <Form action="" v-slot="{ errors }" ref="articleForm" @submit="selectSubmit">
          <div class="modal-body">
            <div class="row g-3">
              <!-- 標題 title -->
              <div class="col-12">
                <label for="articleTitle" class="form-label"
                  >標題<span class="text-danger">*</span></label
                >
                <Field
                  id="articleTitle"
                  name="標題"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['標題'] }"
                  rules="required"
                  v-model="tempArticle.title"
                ></Field>
                <error-message
                  name="標題"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <!-- 描述 description -->
              <div class="col-12">
                <label for="articleDescription" class="form-label">描述</label>
                <input
                  type="text"
                  id="articleDescription"
                  class="form-control"
                  placeholder="簡單描述"
                  v-model.number="tempArticle.description"
                />
              </div>
              <!-- 內容 content -->
              <div class="col-12">
                <label for="articleContent" class="form-label"
                  >內容<span class="text-danger">*</span></label
                >
                <ckeditor
                  id="articleContent"
                  name="內容"
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.content"
                ></ckeditor>
                <p v-if="!tempArticle.content" class="text-danger">內容 為必填</p>
              </div>
              <!-- Tag  -->
              <div class="col-12">
                <div class="d-flex align-items-center mb-2">
                  <label for="articleTag" class="form-label mb-0">Tag</label>
                  <!-- 加入 tag -->
                  <input
                    type="button"
                    class="btn btn-primary btn-sm ms-2"
                    value="Add Tag"
                    @click="tempArticle.tag.push('')"
                  />
                </div>
              </div>
              <template v-if="tempArticle.tag">
                <div
                  class="col-4"
                  v-for="(item, i) in tempArticle.tag"
                  :key="item + i"
                >
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      :id="'articleTag' + i"
                      class="form-control"
                      placeholder="新標籤"
                      v-model.lazy="tempArticle.tag[i]"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="tempArticle.tag.splice(i, 1)"
                    >
                      Ｘ
                    </button>
                  </div>
                </div>
              </template>
              <!-- 作者 author -->
              <div class="col-12">
                <label for="articleAuthor" class="form-label"
                  >作者<span class="text-danger">*</span></label
                >
                <Field
                  id="articleAuthor"
                  name="作者"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['作者'] }"
                  rules="required"
                  v-model="tempArticle.author"
                ></Field>
                <error-message
                  name="作者"
                  class="invalid-feedback"
                ></error-message>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="resetForm"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary"
              :disabled="Object.keys(errors).length !== 0 || !checkData">
              <template v-if="tempArticle.id === undefined">
                <span class="spinner-border spinner-border-sm me-2" role="status"
                  aria-hidden="true" v-if="isLoading.itemID === 'add'"></span>新增
              </template>
              <template v-else>
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"
                  v-if="isLoading.itemID"></span>修改
              </template>
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
    return {
      tempArticle: {
        title: '',
        author: '',
        content: '',
        description: '',
        tag: [],
      },
      editor: ClassicEditor,
      editorData: '<p>請輸入內容。</p>',
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link'],
      },
    };
  },
  props: ['articleData'],
  methods: {
    addArticle() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
      const date = new Date();
      const articleObj = { data: { ...this.tempArticle } };
      articleObj.data.create_at = date.getTime();
      articleObj.data.isPublic = false;
      this.isLoading.itemID = 'add';
      this.axios
        .post(apiUrl, articleObj)
        .then((res) => {
          if (res.data.success) {
            this.loading = false;
            this.hideModal();
            this.$emit('update');
            this.swal(res.data.message);
          } else {
            this.swal(res.data.message, 'error');
          }
          this.isLoading.itemID = '';
        })
        .catch(() => {
          this.swal('無法加入資料喔～快去看什麼問題吧！', 'error');
        });
    },
    putArticle() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      const articleObj = { data: { ...this.tempArticle } };
      this.isLoading.itemID = this.tempArticle.id;
      this.axios
        .put(apiUrl, articleObj)
        .then((res) => {
          if (res.data.success) {
            this.hideModal();
            this.$emit('update');
            this.swal(res.data.message);
          } else {
            this.swal(res.data.message, 'error');
          }
          this.isLoading.itemID = '';
        })
        .catch(() => {
          this.swal('無法修改資料喔～快去看什麼問題吧！', 'error');
        });
    },
    selectSubmit() {
      if (!this.tempArticle.id) {
        this.addArticle();
      } else {
        this.putArticle();
      }
    },
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    resetForm() {
      this.$refs.articleForm.resetForm();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.articleModal);
  },
  computed: {
    checkData() {
      const attrs = ['title', 'content', 'author'];
      return attrs.every((item) => this.tempArticle[item] !== '');
    },
  },
  watch: {
    articleData(item) {
      this.tempArticle = item;
    },
  },
};
</script>
