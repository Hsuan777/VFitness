<template>
  <button
    type="button"
    class="top btn btn-primary position-fixed bottom-5 end-5"
    @click="scrollTo(0)"
    v-show="isShowOfTop"
  >
    <span class="material-icons">vertical_align_top</span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      isShowOfTop: false,
    };
  },
  methods: {
    scrollTo(scrollNumber) {
      window.scrollTo({
        top: scrollNumber,
        behavior: 'smooth',
      });
    },
    showTop() {
      const scrollTop = window.pageYOffset
       || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 100) {
        this.isShowOfTop = true;
      } else {
        this.isShowOfTop = false;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.showTop);
  },
};
</script>

<style lang="scss">
.top {
  width: 50px;
  height: 50px;
  z-index: 100;
}
</style>
