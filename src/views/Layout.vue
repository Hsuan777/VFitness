<template>
  <div class="container bg-light">
    <h2 class="text-info">Layout 範例標題</h2>
    <p>底下三個連結根據不同路徑匯入內容，除了 Home 為預設路徑</p>
    <div id="nav" class="pb-3 mb-3 border-bottom">
      <!-- 修改三處，views > *.vue、router > index.js、App.vue -->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>｜
      <router-link to="/Test">Test</router-link>
    </div>
    <router-view/>
  </div>
</template>
