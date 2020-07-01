<template>
<div id="detail">
 <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="detailNavBar"/>
  <b-scroll class="content"
            ref="backScroll"
            :probe-type="3"
             @scrollPosition = "contentScroll">
    <detail-swiper :top-images="TopImages"/>
    <detail-base-info :goods="goods" class="detailBaseInfo"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-params ref="params" :imagesInfo="imagesInfo" @imgLoad="imgLoad"/>
    <detail-param-info ref="params" :param-info="paramsInfo"></detail-param-info>
    <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommends"></goods-list>
  </b-scroll>
  <BackTop @click.native="BackTopClick" v-show="isShowBackTop"></BackTop>
  <detail-bottom-bar @addToCart=" addToCart"></detail-bottom-bar>
<!--  <Toast :message="message" :show="show"></Toast>-->


</div>
</template>

<script>
    import DetailNavBar from "./detailComps/DetailNavBar";
    import DetailSwiper from "./detailComps/DetailSwiper";
    import DetailBaseInfo from "./detailComps/DetailBaseInfo";
    import DetailShopInfo from "./detailComps/DetailShopInfo";
    import DetailGoodsParams from "./detailComps/DetailGoodsParams";
    import DetailParamInfo from "./detailComps/DetailParamInfo";
    import DetailCommentInfo from "./detailComps/DetailCommentInfo";
    import DetailBottomBar from "./detailComps/DetailBottomBar";

    import BScroll from "../../components/common/scroll/Scroll"
    import GoodsList from "../../components/content/goods/GoodsList";
    import BackTop from "../../components/content/backTop/BackTop";

    import {itemImgListenerMixin} from "../../common/mixin";

    // import Toast from "../../components/common/toast/Toast";


    import {getDetail, Goods, Shop, GoodsParams, getRecommend} from "../../network/detail"
    import {debounce} from "../../common/utils";
    export default {
        name: "Detail",
        data() {
           return {
              iid: null,
             TopImages: null,
             goods: null,
             shop: null,
             imagesInfo: {},
             paramsInfo: {},
             commentInfo: {},
             recommends: [],
             titleTopY: [],
             getTitleTopY: null,
             currentIndex: 0,
             isShowBackTop: false,
             // message: '',
             // show: false
          }
      },
      components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        BScroll,
        DetailGoodsParams,
        DetailParamInfo ,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        // Toast,
      },
      mixins: [itemImgListenerMixin],
      created() {
            //1.获取数据id
            this.iid = this.$route.params.id
            //2.根据id获取数据
            getDetail(this.iid).then(res => {
              //获取轮播数据
              const data = res.result
              this.TopImages = data.itemInfo.topImages,
              //获取商品信息数据
              this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services),
              //获取店铺数据
              this.shop = new Shop(data.shopInfo),
              //获取图片信息
              this.imagesInfo = data.detailInfo,
              // 获取尺寸数据
              this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});
              // 获取评论数据
                if (data.rate.cRate !== 0) {
                  this.commentInfo = data.rate.list[0] || {};
                }
        }),

            //3.请求推荐信息
            getRecommend().then(res => {
              // console.log(res);
              this.recommends = res.data.list;
            });

            //4.titleTopY赋值
            this.getTitleTopY = debounce( () => {
                this.titleTopY = [];
                this.titleTopY.push(0);
                this.titleTopY.push(this.$refs.params.$el.offsetTop- 50);
                this.titleTopY.push(this.$refs.comment.$el.offsetTop - 50);
                this.titleTopY.push(this.$refs.recommend.$el.offsetTop - 50);
                console.log(this.titleTopY)
            }, 100)
      },
      methods: {
        imgLoad() {
          this.$refs.backScroll.refresh;
          this.getTitleTopY()
        },
        titleClick(index) {
        this.$refs.backScroll.scroll.scrollTo(0, -this.titleTopY[index],100)
        },
        contentScroll(position) {
          const positionY = -position.y
          let length = this.titleTopY.length
          for (let i = 0; i < length; i++) {
              if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.titleTopY[i] && positionY < this.titleTopY[i + 1]) ||
              (i === length - 1 && positionY >= this.titleTopY[i]))) {
                this.currentIndex = i;
                this.$refs.detailNavBar.currentIndex = this.currentIndex
              }
          }

          //判断backTop是否显示
          this.isShowBackTop = -position.y >1000;
          },

        BackTopClick() {
          this.$refs.backScroll.scroll.scrollTo(0, 0, 500)
        },
        addToCart() {
           const product = {}
           product.image = this.TopImages[0];
           product.title = this.goods.title;
           product.desc = this.goods.desc;
           product.price = this.goods.realPrice;
           product.iid = this.iid;

           //将商品加入购物车
           this.$store.dispatch('addCar', product).then(res => {

            // this.show = true;
            // this.message = res;
            // setTimeout(() => {
            //   this.show = false;
            //   this.message = '';
            // }, 1500)
            this.$toast.show(res)
            // console.log(this.$toast)
            // console.log(res)

           })

        }
      },
      // mounted() {
      // },
      destroyed() {
        this.$bus.$off('itemImageLoad', this.itemImgListener)
      },
    }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
  .content {
    height: calc(100% - 44px);
  }
  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
</style>
