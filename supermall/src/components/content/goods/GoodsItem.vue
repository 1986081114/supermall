<template>
<div class="goods-item" @click="itemClick">
  <img v-lazy="showImage" alt="" @load="imageLoad">
  <div class="goods-info">
    <p>{{goodItem.title}}</p>
    <span class="price">{{goodItem.price}}</span>
    <span class="cfav">{{goodItem.cfav}}</span>
  </div>
</div>
</template>

<script>
    export default {
        name: "GoodsItem",
        props: {
          goodItem: {
            type: Object,
            default(){
              return {}
            }
          }
      },
      computed: {
        showImage() {
          return this.goodItem.image || this.goodItem.show.img
        }
      },
      methods: {
          //图片加载完成监听
          imageLoad() {
            this.$bus.$emit('itemImageLoad')
          },
           //商品详情页
          itemClick() {
             this.$router.push('/detail/' + this.goodItem.iid)
          },
    }


    }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    /*//根据父块作为参照定位，且原来的*/
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    /*根据浏览器窗口进行定位*/
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .cfav {
    position: relative;
  }
  .goods-info .cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
