<template>
    <div class="shopcars">
  <!--      导航-->
      <nav-bar class="shopNavBar">
       <div slot="nav-bar-center">购物车({{carLength}})</div>
      </nav-bar>

     <!--商品列表-->
      <car-list></car-list>
     <!--底部-->
      <car-bottom-bar></car-bottom-bar>
    </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import carList from "./carComps/carList";
import CarBottomBar from "./carComps/CarBottomBar";

import {mapGetters} from 'vuex'
    export default {
        name: "shopcars",
        components: {
          NavBar,
          carList,
          CarBottomBar,
        },
        computed: {
          ...mapGetters(['carLength', 'carList'])

        }
    }
</script>

<style scoped>
  .shopNavBar {
     background-color:  var(--color-tint);
     color: white;
     font-weight: 700;
  }

</style>
