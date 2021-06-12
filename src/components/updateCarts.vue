<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      cartsData: {
        carts: [],
      },
      isUpdate: this.isUpdateData,
    };
  },
  methods: {
    getCartsList() {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(apiUrl).then((res) => {
        if (res.data.success) {
          this.cartsData = res.data.data;
          this.$emit('update-data', this.cartsData);
          console.log('執行更新');
        } else {
          this.swal(res.data.message);
        }
      }).catch((res) => {
        this.swal('無法取得資料喔～快去看什麼問題吧！');
        console.log(res);
      });
    },
    swal(msg) {
      this.$swal.fire({
        position: 'bottom-end',
        title: msg,
        width: 'auto',
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },
  props: ['isUpdateData'],
  created() {
    console.log(this.isUpdateData);
    // this.getCartsList();
  },
  watch: {
    isUpdateData(value) {
      console.log(this.isUpdateData);
      console.log(value);
      if (value) {
        this.getCartsList();
      }
    },
  },
};
</script>
