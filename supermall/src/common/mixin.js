import {debounce} from "./utils";

export const itemImgListenerMixin = {
  mounted() {
    //监听item图片加载完成，防抖
    const refresh = debounce( this.$refs.backScroll.refresh, 100)

    //对监听事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log("mixin")

  },

}
