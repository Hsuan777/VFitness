<template>
  <input class="form-control" list="datalistOptions" id="searchData"
    placeholder="To search..." v-model="cacheSearch">
  <datalist id="datalistOptions">
    <option v-for="(item, key) in recordSearch" :value="item" :key="item + key"></option>
  </datalist>
</template>

<script>
export default {
  data() {
    return {
      cacheSearch: '',
      recordSearch: [],
    };
  },
  emits: ['filter-data'],
  watch: {
    cacheSearch(value) {
      this.$emit('filter-data', value);
      if (this.recordSearch.length < 10) {
        this.recordSearch.unshift(value);
      } else {
        this.recordSearch.pop();
        this.recordSearch.unshift(value);
      }
    },
  },
};
</script>
