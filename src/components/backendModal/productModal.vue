<template>
  <div class="modal fade" ref="productModal" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" v-if="tempProduct.id === undefined">新增商品</h5>
          <h5 class="modal-title" v-else>修改商品</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <Form action="" v-slot="{ errors }" ref="productForm" @submit="selectSubmit">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12">
                <label for="productName" class="form-label">商品名稱
                  <span class="text-danger">*</span>
                </label>
                <Field id="productName" name="商品名稱" type="text" class="form-control"
                  :class="{ 'is-invalid': errors['商品名稱'] }" rules="required"
                  v-model="tempProduct.title">
                </Field>
                <error-message name="商品名稱" class="invalid-feedback"></error-message>
              </div>
              <div class="col-12">
                <label for="productDescription" class="form-label">描述</label>
                <input type="text" id="productDescription" class="form-control" placeholder="描述"
                  v-model="tempProduct.description">
              </div>
              <div class="col-12">
                <label for="productContent" class="form-label">內容</label>
                <textarea type="text" rows="3" id="productContent" class="form-control"
                  placeholder="商品內容" v-model="tempProduct.content">
                </textarea>
              </div>
              <div class="col">
                <label for="productOriginPrice" class="form-label">定價
                  <span class="text-danger">*</span>
                </label>
                <Field id="productOriginPrice" name="定價" type="number" class="form-control"
                  :class="{ 'is-invalid': errors['定價'] }" rules="min_value:0|required"
                  v-model.number="tempProduct.origin_price">
                </Field>
                <error-message name="定價" class="invalid-feedback"></error-message>
              </div>
              <div class="col">
                <label for="productPrice" class="form-label">售價
                  <span class="text-danger">*</span>
                </label>
                <Field id="productPrice" name="售價" type="number" class="form-control"
                  :class="{ 'is-invalid': errors['售價'] }" rules="min_value:0|required"
                  v-model.number="tempProduct.price">
                </Field>
                <error-message name="售價" class="invalid-feedback"></error-message>
              </div>
              <div class="col">
                <label for="productCategory" class="form-label">類別
                  <span class="text-danger">*</span>
                </label>
                <Field id="productCategory" name="類別" type="text" class="form-control"
                  :class="{ 'is-invalid': errors['類別'] }" rules="required"
                  v-model="tempProduct.category">
                </Field>
                <error-message name="類別" class="invalid-feedback"></error-message>
              </div>
              <div class="col">
                <label for="productUnit" class="form-label">單位
                  <span class="text-danger">*</span>
                </label>
                <Field id="productUnit" name="單位" type="text" class="form-control"
                  :class="{ 'is-invalid': errors['單位'] }" rules="required"
                  v-model="tempProduct.unit">
                </Field>
                <error-message name="單位" class="invalid-feedback"></error-message>
              </div>
              <template v-if="tempProduct.category">
                <div class="col" v-show="tempProduct.category === '課程'">
                  <label for="productStars" class="form-label">難易度</label>
                  <Field id="productStars" name="難易度" type="number" class="form-control"
                    :class="{ 'is-invalid': errors['難易度'] }" rules="max_value:5|min_value:1"
                    v-model="tempProduct.options.stars">
                  </Field>
                  <error-message name="難易度" class="invalid-feedback"></error-message>
                </div>
                <div class="col" v-show="tempProduct.category === '餐飲'">
                  <label for="productCalorie" class="form-label">卡路里</label>
                  <Field id="productCalorie" name="卡路里" type="number" class="form-control"
                    :class="{ 'is-invalid': errors['卡路里'] }" rules="min_value:0"
                    v-model="tempProduct.options.calorie">
                  </Field>
                  <error-message name="卡路里" class="invalid-feedback"></error-message>
                </div>
              </template>
              <div class="col-12">
                <div class="d-flex align-items-center mb-2">
                  <label for="productImageUrl" class="form-label mb-0">主圖網址</label>
                  <!-- 加入額外圖片 -->
                  <input type="button" class="btn btn-primary btn-sm ms-2" value="Add Image"
                    @click="tempProduct.imagesUrl.push('')">
                </div>
                <input type="text" id="productImageUrl" class="form-control mb-3" placeholder="網址"
                  v-model="tempProduct.imageUrl">
                <!-- 額外圖片輸入 -->
                <template v-for="(item, i) in tempProduct.imagesUrl" :key="'productImageUrl' + i">
                  <label :for="'productImageUrl' + i" class="form-label">其他圖片網址 {{i + 1}}</label>
                  <div class="input-group mb-3">
                    <input type="text" :id="'productImageUrl' + i" class="form-control"
                      placeholder="網址" v-model="tempProduct.imagesUrl[i]">
                    <button type="button" class="btn btn-outline-secondary"
                      @click="tempProduct.imagesUrl.splice(i, 1)">Ｘ</button>
                  </div>
                </template>
              </div>
              <!-- 主圖預覽 -->
              <div class="col-4">
                <label for="" class="form-label">主圖</label>
                <img class="img-thumbnail" :src="tempProduct.imageUrl" :alt="tempProduct.title">
              </div>
              <!-- 其他圖片預覽 -->
              <template v-if="tempProduct.imagesUrl">
                <div class="col-4" v-for="(item, key) in tempProduct.imagesUrl" :key="item">
                  <label for="" class="form-label">其他圖片 {{key + 1}}</label>
                  <img class="img-thumbnail" :src="tempProduct.imagesUrl[key]"
                    :alt="tempProduct.title">
                </div>
              </template>
            </div>
          </div>
          <div class="modal-footer">
            <!-- 若有錯誤則阻止新增 -->
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary"
              :disabled="Object.keys(errors).length !== 0">
              <template v-if="tempProduct.id === undefined">
                <span class="spinner-border spinner-border-sm me-2" role="status"
                  aria-hidden="true" v-if="isLoading.itemID === 'add'"></span>新增
              </template>
              <template v-else>
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"
                  v-if="isLoading.itemID === tempProduct.id"></span>修改
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
      isLoading: {
        itemID: '',
        status: false,
      },
      tempProduct: {},
    };
  },
  props: ['productData'],
  methods: {
    addProduct() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      const productObj = { data: { ...this.tempData } };
      this.isLoading.itemID = 'add';
      this.axios.post(apiUrl, productObj).then((res) => {
        if (res.data.success) {
          this.hideModal();
          this.$emit('update');
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message);
        }
        this.isLoading.itemID = '';
      }).catch(() => {
        this.swal('無法加入資料喔～快去看什麼問題吧！', 'error');
      });
    },
    putProduct() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      const productObj = { data: { ...this.tempProduct } };
      this.isLoading.itemID = this.tempProduct.id;
      this.axios.put(apiUrl, productObj).then((res) => {
        if (res.data.success) {
          this.hideModal();
          this.$emit('update');
          this.swal(res.data.message);
        } else {
          this.swal(res.data.message);
        }
        this.isLoading.itemID = '';
      }).catch(() => {
        this.swal('無法修改資料喔～快去看什麼問題吧！', 'error');
      });
    },
    selectSubmit() {
      console.log('123');
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
    swal(msg) {
      this.$swal.fire({
        position: 'center',
        icon: 'success',
        title: msg,
        width: 'auto',
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal);
  },
  watch: {
    productData(item) {
      this.tempProduct = item;
      if (!item.id) {
        this.$refs.productForm.resetForm();
      }
    },
  },
};
</script>
