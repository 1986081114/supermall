<template>
    <div id="home">
      <nav-bar class="home-navBar"><div slot="nav-bar-center">购物街</div></nav-bar>
      <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></TabControl>

      <BScroll class="content"
               ref="backScroll"
               :probe-type="3"
               @scrollPosition = "contentScroll"
               :pull-up-load="true"
               @pullingUp = "loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <HomeRecommend :recommends="recommends"></HomeRecommend>
        <HomeFeatureView></HomeFeatureView>
        <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></TabControl>
        <GoodsList :goods=showGoods></GoodsList>
      </BScroll>
<!--      监听组件的原生事件加上nativ修饰符才能监听-->
      <BackTop @click.native="BackTopClick" v-show="isShowBackTop"></BackTop>

      </div>
</template>


<script>
     import NavBar from "../../components/common/navbar/NavBar";
     import TabControl from "../../components/content/tabController/TabControl";
     import GoodsList from "../../components/content/goods/GoodsList";
     import BScroll from "../../components/common/scroll/Scroll"

      // import {Swiper, SwiperItem} from "../../components/common/swiper/index";
     import homeSwiper  from "./childComps/homeSwiper";
     import HomeRecommend from "./childComps/HomeRecommend";
     import HomeFeatureView from "./childComps/HomeFeatureView";
     import BackTop from "../../components/content/backTop/BackTop";

     import {getHomeMultiData, getHomeGoods} from "../../network/home";
     //防抖动函数
     // import {debounce} from "../../common/utils";
     import {itemImgListenerMixin} from "../../common/mixin";


     export default {
        name: "home",
        components: {
          NavBar,
          homeSwiper,
          HomeRecommend,
          HomeFeatureView,
          TabControl,
          GoodsList,
          BScroll,
          BackTop,

          // SwiperItem,
          // Swiper
        },

    data() {
          return {
            banners: [],
            recommends: [],
            goods: {
              'pop': {page: 0, list: []},
              'new': {page: 0, list: []},
              'sell': {page: 0, list: []},
            },
            currentType: 'pop',
            isShowBackTop: false,
            taboffsetTop: 0,
            isTabFixed: false,
            scrollY: 0,
            itemImgListener: null,
          }
    },
    computed: {
          showGoods (){
            return this.goods[this.currentType].list
          }
    },
    methods: {
          /**
           * 事件监听
           * */
           tabClick(index) {
             switch (index) {
               case 0:
                 this.currentType = 'pop'
                     break
               case 1:
                 this.currentType = 'new'
                     break
               case 2:
                 this.currentType = 'sell'
                     break
             }
             this.$refs.tabControl1.currentIndex = index;
             this.$refs.tabControl2.currentIndex = index;
           },
           BackTopClick() {
            this.$refs.backScroll.scroll.scrollTo(0, 0, 500)
           },
           //监听首页滚动位置
           contentScroll(position) {
             //判断backTop是否显示
             this.isShowBackTop = -position.y >1000;
             //决定tabController是否吸顶
             this.isTabFixed = (-position.y) > this.taboffsetTop;
           },
           //上拉加载更多
           loadMore() {
             this.homegetHomeGoods(this.currentType)
             // this.$refs.backScroll.scroll.refresh()
           },
           //监听轮播图加载完成
           swiperImageLoad() {
             //2.获取tabController 的 offsetTop
             //所有组件都有一个属性￥el： 用于获取组件的元素
             this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop

           },
          /**
           * 网络请求
           */
          homeGetHomeMultiData(){
                getHomeMultiData().then(res => {

                  this.banners = res.data.banner.list;
                  this.recommends = res.data.recommend.list;
                })
              },
          homegetHomeGoods(type){
              const page = this.goods[type].page + 1
              getHomeGoods(type, page).then( res => {
              this.goods[type].list.push(...res.data.list);
              this.goods[type].page ++;
              this.$refs.backScroll.scroll.finishPullUp()
            })
      }


    },
    mixins: [itemImgListenerMixin],
    created(){
          //请求多个数据
         this.homeGetHomeMultiData();
         //请求商品数据
         this.homegetHomeGoods('pop')
         this.homegetHomeGoods('new')
         this.homegetHomeGoods('sell')


    },
    // mounted() {
    //       // //监听item图片加载完成，防抖
    //       // const refresh = debounce( this.$refs.backScroll.refresh, 100)
    //       //
    //       // //对监听事件进行保存
    //       // this.itemImgListener = () => {
    //       //   refresh()
    //       // }
    //       // this.$bus.$on('itemImageLoad', this.itemImgListener)
    //       //   //2.获取tabController 的 offsetTop
    //       //   // 所有组件都有一个属性￥el： 用于获取组件的元素
    //       //  // console.log(this.$refs.tabControl.$el.offsetTop)
    // },

       activated() {
         this.$refs.backScroll.refresh()
         this.$refs.backScroll.scroll.scrollTo(0,this.scrollY, 0)
       },
       deactivated() {
         this.scrollY = this.$refs.backScroll.scroll.y

         //取消全局的监听
         this.$bus.$off('itemImageLoad', this.itemImgListener)

       }
    }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }

  .home-navBar {
    background-color: var(--color-tint);
    color: white;

  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0px;
    left: 0px;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
