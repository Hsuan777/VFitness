<script>
export default {
  methods: {
    swal(msg, iconStatus = 'success') {
      this.$swal.fire({
        position: 'center',
        icon: iconStatus,
        title: msg,
        width: 'auto',
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },
};
</script>
