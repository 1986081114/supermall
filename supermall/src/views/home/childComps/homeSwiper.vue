<template>
  <div>
    <swiper v-if="banners.length !==0">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" >
        </a>
      </swiper-item>
    </swiper>
  </div>

</template>

<script>
  import {Swiper, SwiperItem} from "../../../components/common/swiper/index";
    export default {
        name: "homeSwiper",
      props: {
         banners: {
           type: Array,
           default() {
             return []
           }
         }
      },
      components: {
          Swiper,
        SwiperItem

      },
      data() {
          return {
            isLoad: false
          }
      },
      methods: {
          imageLoad() {
            if(!this.isLoad) {
              this.$emit('swiperImageLoad')
              this.isLoad = true
            }

          }
      }

    }
</script>

<style scoped>

</style>
