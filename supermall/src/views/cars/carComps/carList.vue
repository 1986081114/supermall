<template>
    <div class="carList">
    <scroll class="content" ref="backScroll">
     <car-list-item v-for="(item, index) in carList" :product = item :key="index"></car-list-item>
    </scroll>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from "../../../components/common/scroll/Scroll";
import carListItem from "./carListItem";


    export default {
        name: "carList",
        components: {
          Scroll,
          carListItem,
        },
        computed: {
          ...mapGetters(['carLength', 'carList'])
        },
        activated() {
          this.$refs.backScroll.refresh()
        }
    }
</script>

<style scoped>
.carList {
  width: 100%;
  height: 100%;
}
 .content {
   position: absolute;
   top: 44px;
   right: 0;
   bottom: 49px;
   left: 0;
   overflow: hidden;
   width: 100%;
   background-color: #ffffff;
 }
</style>
