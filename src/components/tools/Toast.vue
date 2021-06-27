<template>
  <div class="position-fixed bottom-10 end-5 pb-4" style="z-index: 999">
    <div
      ref="liveToast"
      class="bg-white rounded toast hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-3">通知訊息</strong>
        <small class="ms-auto">{{date}}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div
        class="toast-body text-center"
        :class="status === 'error' ? 'text-danger' : 'text-success'"
      >
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  data() {
    return {
      toast: {},
      msg: '',
      status: '',
      date: '',
    };
  },
  methods: {
    showToast(message, status) {
      this.msg = message;
      this.status = status;
      this.date = new Date().toLocaleString();
      this.toast.show();
    },
    hideToast() {
      this.toast.hide();
    },
  },
  mounted() {
    this.toast = new Toast(this.$refs.liveToast);
  },
};
</script>
