<template>
  <div class="studio__toast__position toast-container position-fixed pb-4" style="z-index: 999">
    <div
      v-for="item in toastIndex"
      :key="item"
      :ref="`liveToast${item}`"
      class="toast hide bg-white border border-secondary rounded"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <!-- 若不使用 v-if，vue 抓不到會報錯 -->
      <template v-if="toastArray[item - 1]">
        <div class="toast-header">
          <strong class="h4 mb-0 me-3">通知訊息</strong>
          <small class="ms-auto">{{ toastArray[item - 1].date }}</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="toast-body text-center h6 mb-0"
          :class="toastArray[item - 1].status === 'error' ? 'text-danger' : 'text-success'"
        >
          {{ toastArray[item - 1].msg }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  data() {
    return {
      toastTarget: {},
      toastIndex: 1,
      toastArray: [],
    };
  },
  methods: {
    showToast(message, toastStatus) {
      const nowDate = new Date().toLocaleString();
      const toastInfo = {
        msg: message,
        status: toastStatus,
        date: nowDate,
      };
      this.toastArray.push(toastInfo);
      this.toastTarget = new Toast(this.$refs[`liveToast${this.toastIndex}`]);
      this.toastIndex += 1;
      this.toastTarget.show();
    },
    hideToast() {
      this.toast.hide();
    },
  },
};
</script>
