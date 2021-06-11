<template>
  <header class="d-flex align-items-center py-2">
    <h3 class="mb-0">訂單列表</h3>
    <input type="search" name="" id="" class="ms-auto">
  </header>
  <p>訂單內容</p>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
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
};
</script>
