<template>
  <div class="modal fade" ref="orderModal"
    data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="orderModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="h5 modal-title" id="orderModalLabel" >修改訂單</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <Form action="" v-slot="{ errors }" ref="orderForm">
          <div class="modal-body">
            <table class="table table-bordered border-secondary">
              <tbody>
                <tr>
                  <th>訂購時間</th>
                  <td>{{new Date(order.create_at*1000).toLocaleString()}}
                  </td>
                </tr>
                <tr>
                  <th>訂購 ID</th>
                  <td>{{order.id}}</td>
                </tr>
                <tr>
                  <th>訂購人</th>
                  <td>{{order.user.name}}</td>
                </tr>
                <tr>
                  <th>聯絡信箱</th>
                  <td>{{order.user.email}}</td>
                </tr>
                <tr>
                  <th>聯絡電話</th>
                  <td>{{order.user.tel}}</td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>{{order.user.address}}</td>
                </tr>
                <tr>
                  <th>商品清單</th>
                  <td>
                    <p class="d-flex mb-0" v-for="item in order.products" :key="item.product.id">
                      {{item.product.title}} x {{item.qty}} {{item.product.unit}}=
                      <span class="ms-auto">${{Math.floor(item.final_total)}}</span>
                    </p>
                    <p class="text-end mb-0 border-top pt-1">合計 : ${{Math.floor(order.total)}}</p>
                  </td>
                </tr>
                <tr>
                  <th>備註</th>
                  <td>{{order.message}}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>{{order.is_paid ? '已付款' : '未付款'}}</td>
                </tr>
              </tbody>
            </table>
            <div class="col">
              <label for="editTotal" class="form-label">修改金額
                <span class="text-danger">*</span>
              </label>
              <Field id="editTotal" name="修改金額" type="number" class="form-control"
                :class="{ 'is-invalid': errors['修改金額'] }" rules="min_value:0"
                v-model="order.total"></Field>
              <error-message name="修改金額" class="invalid-feedback"></error-message>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="editTotal">
              修改
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
      order: {
        user: {},
      },
    };
  },
  props: ['data'],
  methods: {
    editTotal() {
      this.$emit('editTotal', this.order);
      this.hideModal();
    },
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.orderModal);
  },
  watch: {
    data(value) {
      this.order = value;
    },
  },
};
</script>
