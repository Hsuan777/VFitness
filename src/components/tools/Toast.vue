<template>
  <div class="studio__toast__position toast-container position-fixed pb-4" style="z-index: 999">
    <div
      v-for="item in tempMessage"
      :key="item"
      :ref="`liveToast${item}`"
      class="toast hide bg-white border border-secondary rounded"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="h4 mb-0 me-3">通知訊息</strong>
        <small class="ms-auto">{{date}}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div
        class="toast-body text-center h6 mb-0"
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
      tempMessage: 1,
    };
  },
  methods: {
    showToast(message, status) {
      this.msg = message;
      this.status = status;
      this.date = new Date().toLocaleString();
      this.toast = new Toast(this.$refs[`liveToast${this.tempMessage}`]);
      this.tempMessage += 1;
      this.toast.show();
    },
    hideToast() {
      this.toast.hide();
    },
  },
};
</script>
