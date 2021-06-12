<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger">刪除</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <p>您是否要刪除[ {{tab}} ][ {{data}}]?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-outline-danger" @click="$emit('delete-data')">
          刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'tab', 'loading'],
};
</script>
