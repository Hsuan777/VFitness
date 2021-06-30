<template>
  <div
    class="modal fade"
    ref="productModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title h5 text-primary" v-if="tempProduct.id === undefined">新增商品</p>
          <p class="modal-title h5" v-else>修改商品</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="resetForm"
          ></button>
        </div>
        <Form action="" v-slot="{ errors }" ref="productForm" @submit="selectSubmit">
          <div class="modal-body">
            <div class="row g-3">
              <!-- 商品名稱  title -->
              <div class="col-12">
                <label for="productName" class="form-label">
                  商品名稱<span class="text-danger">*</span>
                </label>
                <Field
                  id="productName"
                  name="商品名稱"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['商品名稱'] }"
                  rules="required"
                  v-model="tempProduct.title"
                >
                </Field>
                <error-message name="商品名稱" class="invalid-feedback"></error-message>
              </div>
              <!-- 描述 description -->
              <div class="col-12">
                <label for="productDescription" class="form-label">描述</label>
                <input
                  type="text"
                  id="productDescription"
                  class="form-control"
                  placeholder="描述"
                  v-model="tempProduct.description"
                />
              </div>
              <!-- 內容 content -->
              <div class="col-12">
                <label for="productContent" class="form-label">內容</label>
                <textarea
                  type="text"
                  rows="3"
                  id="productContent"
                  class="form-control"
                  placeholder="商品內容"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <!-- 定價 origin_price -->
              <div class="col-3">
                <label for="productOriginPrice" class="form-label">
                  定價<span class="text-danger">*</span>
                </label>
                <Field
                  id="productOriginPrice"
                  name="定價"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors['定價'] }"
                  rules="min_value:0|required"
                  v-model.number="tempProduct.origin_price"
                >
                </Field>
                <error-message name="定價" class="invalid-feedback"></error-message>
              </div>
              <!-- 售價 price -->
              <div class="col-3">
                <label for="productPrice" class="form-label"
                  >售價
                  <span class="text-danger">*</span>
                </label>
                <Field
                  id="productPrice"
                  name="售價"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors['售價'] }"
                  rules="min_value:0|required"
                  v-model.number="tempProduct.price"
                >
                </Field>
                <error-message name="售價" class="invalid-feedback"></error-message>
              </div>
              <!-- 類別 category -->
              <div class="col-3">
                <label for="productCategory" class="form-label">
                  類別<span class="text-danger">*</span>
                </label>
                <Field
                  id="productCategory"
                  name="類別"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['類別'] }"
                  rules="required"
                  v-model="tempProduct.category"
                >
                </Field>
                <error-message name="類別" class="invalid-feedback"></error-message>
              </div>
              <!-- 單位 unit -->
              <div class="col-3">
                <label for="productUnit" class="form-label">
                  單位<span class="text-danger">*</span>
                </label>
                <Field
                  id="productUnit"
                  name="單位"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['單位'] }"
                  rules="required"
                  v-model="tempProduct.unit"
                >
                </Field>
                <error-message name="單位" class="invalid-feedback"></error-message>
              </div>
              <template
                v-if="this.tempProduct.category === '餐點' || this.tempProduct.category === '飲品'"
              >
                <!-- 卡路里 calories -->
                <div class="col-3">
                  <label for="foodCalories" class="form-label">卡路里</label>
                  <Field
                    id="foodCalories"
                    name="卡路里"
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': errors['卡路里'] }"
                    rules="min_value:0"
                    v-model="tempProduct.options.food.calories"
                  >
                  </Field>
                  <error-message name="卡路里" class="invalid-feedback"></error-message>
                </div>
                <!-- 碳水化合物 carbs -->
                <div class="col-3">
                  <label for="foodCarbs" class="form-label">碳水化合物</label>
                  <Field
                    id="foodCarbs"
                    name="碳水化合物"
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': errors['碳水化合物'] }"
                    rules="min_value:0"
                    v-model="tempProduct.options.food.carbs"
                  >
                  </Field>
                  <error-message name="碳水化合物" class="invalid-feedback"></error-message>
                </div>
                <!-- 蛋白質 protein -->
                <div class="col-3">
                  <label for="foodProtein" class="form-label">蛋白質</label>
                  <Field
                    id="foodProtein"
                    name="蛋白質"
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': errors['蛋白質'] }"
                    rules="min_value:0"
                    v-model="tempProduct.options.food.protein"
                  >
                  </Field>
                  <error-message name="蛋白質" class="invalid-feedback"></error-message>
                </div>
                <!-- 脂肪 fat -->
                <div class="col-3">
                  <label for="foodFat" class="form-label">脂肪</label>
                  <Field
                    id="foodFat"
                    name="脂肪"
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': errors['脂肪'] }"
                    rules="min_value:0"
                    v-model="tempProduct.options.food.fat"
                  >
                  </Field>
                  <error-message name="脂肪" class="invalid-feedback"></error-message>
                </div>
              </template>
              <template
                v-if="this.tempProduct.category === '有氧' || this.tempProduct.category === '阻力'"
              >
                <!-- 難易度 stars -->
                <div class="col-3">
                  <label for="courseStars" class="form-label">難易度</label>
                  <Field
                    id="courseStars"
                    name="難易度"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['難易度'] }"
                    rules=""
                    placeholder="低、中、難"
                    v-model="tempProduct.options.course.stars"
                  >
                  </Field>
                  <error-message name="難易度" class="invalid-feedback"></error-message>
                </div>
                <!-- 課程時間 duration -->
                <div class="col-3">
                  <label for="courseDuration" class="form-label">課程時間</label>
                  <Field
                    id="courseDuration"
                    name="課程時間"
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': errors['課程時間'] }"
                    rules="min_value:0"
                    v-model="tempProduct.options.course.duration"
                  >
                  </Field>
                  <error-message name="課程時間" class="invalid-feedback"></error-message>
                </div>
                <!-- 上課區域 area -->
                <div class="col-3">
                  <label for="courseArea" class="form-label">上課區域</label>
                  <Field
                    id="courseArea"
                    name="上課區域"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['上課區域'] }"
                    rules=""
                    v-model="tempProduct.options.course.area"
                  >
                  </Field>
                  <error-message name="上課區域" class="invalid-feedback"></error-message>
                </div>
                <!-- 授課老師 teacher -->
                <div class="col-3">
                  <label for="courseTeacher" class="form-label">授課老師</label>
                  <Field
                    id="courseTeacher"
                    name="授課老師"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['授課老師'] }"
                    rules=""
                    v-model="tempProduct.options.course.teacher"
                  >
                  </Field>
                  <error-message name="授課老師" class="invalid-feedback"></error-message>
                </div>
              </template>
              <!-- 主圖與額外圖片網址 imageUrl imagesUrl-->
              <div class="col-12">
                <div class="d-flex align-items-center mb-2">
                  <label for="productImageUrl" class="form-label mb-0">主圖網址</label>
                  <!-- 加入額外圖片 -->
                  <input
                    type="button"
                    class="btn btn-primary btn-sm ms-2"
                    value="Add Image"
                    @click="tempProduct.imagesUrl.push('')"
                  />
                </div>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="file"
                    ref="mainUpload"
                    name="main-upload"
                    @change="imageUpload('mainUpload', 'main-upload', 'imageUrl')"
                  />
                  <input
                    type="text"
                    id="productImageUrl"
                    class="form-control"
                    placeholder="網址"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <!-- 額外圖片輸入 -->
                <div v-for="(item, i) in tempProduct.imagesUrl" :key="'productImageUrl' + i">
                  <label :for="'productImageUrl' + i" class="form-label"
                    >其他圖片網址 {{ i + 1 }}</label
                  >
                  <div class="input-group mb-3">
                    <input
                      class="form-control"
                      type="file"
                      :ref="i + 'Upload'"
                      :name="i + '-upload'"
                      @change="imageUpload(`${i + 'Upload'}`, `${i + '-upload'}`, 'imagesUrl', i)"
                    />
                    <input
                      type="text"
                      :id="'productImageUrl' + i"
                      class="form-control"
                      placeholder="網址"
                      v-model="tempProduct.imagesUrl[i]"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="tempProduct.imagesUrl.splice(i, 1)"
                    >
                      Ｘ
                    </button>
                  </div>
                </div>
              </div>
              <!-- 主圖預覽 -->
              <div class="col-4">
                <label for="" class="form-label">主圖</label>
                <img class="img-thumbnail" :src="tempProduct.imageUrl" :alt="tempProduct.title" />
              </div>
              <!-- 其他圖片預覽 -->
              <template v-if="tempProduct.imagesUrl">
                <div class="col-4" v-for="(item, key) in tempProduct.imagesUrl" :key="item">
                  <label for="" class="form-label">其他圖片 {{ key + 1 }}</label>
                  <img
                    class="img-thumbnail"
                    :src="tempProduct.imagesUrl[key]"
                    :alt="tempProduct.title"
                  />
                </div>
              </template>
            </div>
          </div>
          <div class="modal-footer">
            <!-- 若有錯誤則阻止新增 -->
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="resetForm"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="Object.keys(errors).length !== 0"
            >
              <template v-if="tempProduct.id === undefined">
                <span
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                  v-if="isLoading.itemID === 'add'"
                ></span
                >新增
              </template>
              <template v-else>
                <span
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                  v-if="isLoading.itemID === tempProduct.id"
                ></span
                >修改
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

export default {
  data() {
    return {
      // 為了讓 resetForm 可以先抓到變數而不產生驗證錯誤訊息回饋
      tempProduct: {
        category: '',
        content: '',
        description: '',
        origin_price: 0,
        price: 0,
        title: '',
        unit: '',
        num: '',
        imageUrl: '',
        imagesUrl: [],
        options: {
          food: {
            calories: 0, // 卡路里
            carbs: 0, // 碳水化合物
            protein: 0, // 蛋白質
            fat: 0, // 脂肪
          },
          course: {
            stars: '', // 難易度，低、中、難
            duration: 50, // 一堂 50 分
            teacher: '', // 老師
            area: '', // 上課區域
          },
        },
      },
    };
  },
  props: ['productData'],
  methods: {
    addProduct() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      const productObj = { data: { ...this.tempProduct } };
      this.isLoading.itemID = 'add';
      this.axios
        .post(apiUrl, productObj)
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
          this.swal('無法加入資料喔～快去看什麼問題吧！', 'error');
        });
    },
    putProduct() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      const productObj = { data: { ...this.tempProduct } };
      this.isLoading.itemID = this.tempProduct.id;
      this.axios
        .put(apiUrl, productObj)
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
    imageUpload(refInput, name, url, i) {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      const formData = new FormData();
      const tempImageFile = this.$refs[refInput].files[0];
      formData.append(name, tempImageFile);
      this.axios
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.success) {
            if (url === 'imageUrl') {
              this.tempProduct[url] = res.data.imageUrl;
            } else {
              this.tempProduct[url][i] = res.data.imageUrl;
            }
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('無法加入上傳圖片喔～快去看什麼問題吧！', 'error');
        });
    },
    selectSubmit() {
      if (!this.tempProduct.id) {
        this.addProduct();
      } else {
        this.putProduct();
      }
    },
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    resetForm() {
      this.$refs.productForm.resetForm();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal);
  },
  watch: {
    productData(item) {
      this.tempProduct = item;
    },
  },
};
</script>
