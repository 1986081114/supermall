<template>
  <div id="app">
    <keep-alive exclude='Detail'><router-view></router-view></keep-alive>
   <MainTabBar></MainTabBar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabber/MainTabBar';
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>
<style lang="scss">
@import "assets/css/base.css";
</style>
