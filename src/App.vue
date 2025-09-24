<template>
  <div id="app">
    <!-- 全局加载组件 -->
    <Loading :visible="$store.getters.isLoading"></Loading>
    <!-- 一级路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
