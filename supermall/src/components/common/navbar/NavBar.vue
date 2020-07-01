<template>
    <div class="nav-bar">
      <div class="nav-bar-left"><slot name="nav-bar-left"></slot></div>
      <div class="nav-bar-center"><slot name="nav-bar-center"></slot></div>
      <div class="nav-bar-right"><slot name="nav-bar-right"></slot></div>

    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    /*line-height是行高的意思，它决定了元素中文本内容的高度，height则是定义元素自身的高度。*/
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .nav-bar-left , .nav-bar-right {
    width: 60px;

  }
  .nav-bar-center {
    flex: 1;

  }

</style>
