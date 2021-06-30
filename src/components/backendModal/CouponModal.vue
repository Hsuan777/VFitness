<template>
  <div
    class="modal fade"
    ref="couponModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title h5 text-primary" v-if="!tempCoupon.id">新增優惠券</p>
          <p class="modal-title h5" v-else>修改優惠券</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetForm"
          ></button>
        </div>
        <Form action="" v-slot="{ errors }" ref="couponForm" @submit="selectSubmit">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12">
                <label for="couponName" class="form-label"
                  >名稱
                  <span class="text-danger">*</span>
                </label>
                <Field
                  id="couponName"
                  name="名稱"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['名稱'] }"
                  rules="required"
                  v-model="tempCoupon.title"
                >
                </Field>
                <error-message name="名稱" class="invalid-feedback"></error-message>
              </div>
              <div class="col">
                <label for="couponPercent" class="form-label"
                  >折扣率
                  <span class="text-danger">*</span>
                </label>
                <Field
                  id="couponPercent"
                  name="折扣率"
                  type="number"
                  class="form-control"
                  placeholder="80 為 8 折"
                  :class="{ 'is-invalid': errors['折扣率'] }"
                  rules="min_value:0|max_value:99|required"
                  v-model.number="tempCoupon.percent"
                >
                </Field>
                <error-message name="折扣率" class="invalid-feedback"></error-message>
              </div>
              <div class="col">
                <label for="couponCode" class="form-label"
                  >代碼
                  <span class="text-danger">*</span>
                </label>
                <Field
                  id="couponCode"
                  name="代碼"
                  type="text"
                  class="form-control"
                  placeholder="英數較佳 e.g. VS777"
                  :class="{ 'is-invalid': errors['代碼'] }"
                  rules="min:5|required"
                  v-model="tempCoupon.code"
                >
                </Field>
                <error-message name="代碼" class="invalid-feedback"></error-message>
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
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="Object.keys(errors).length !== 0"
            >
              <template v-if="tempCoupon.id === undefined">
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
                  v-if="isLoading.itemID"
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
      modal: {},
      tempCoupon: {
        title: '',
        percent: 0,
        code: '',
      },
    };
  },
  props: ['couponData'],
  methods: {
    addCoupon() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      const date = new Date();
      const couponObj = { data: { ...this.tempCoupon } };
      // setDate 會變更現在日期，例如當月 23 號，setDate(30)，會變成當月 30 號
      // 暫時設定往後 30 天，之後改成可選日期
      date.setDate(date.getDate() + 30);
      couponObj.data.due_date = date.getTime();
      couponObj.data.is_enabled = 0;
      this.isLoading.itemID = 'add';
      this.axios
        .post(apiUrl, couponObj)
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
    putCoupon() {
      const couponObj = { data: { ...this.tempCoupon } };
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading.itemID = this.tempCoupon.id;
      this.axios
        .put(apiUrl, couponObj)
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
      if (!this.tempCoupon.id) {
        this.addCoupon();
      } else {
        this.putCoupon();
      }
    },
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    resetForm() {
      this.$refs.couponForm.resetForm();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.couponModal);
  },
  watch: {
    couponData(item) {
      this.tempCoupon = item;
    },
  },
};
</script>
