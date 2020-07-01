<template>
<div class="goods">
  <GoodsItem v-for="(item,index) in goods" :goodItem = "item" :key="index"></GoodsItem>
</div>
</template>

<script>
  import GoodsItem from "./GoodsItem";
    export default {
        name: "GoodsList",
        components: {
          GoodsItem
        },
        props: {
           goods: {
             type: Array,
             default(){
               return []
             }
           }
      }
    }
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
