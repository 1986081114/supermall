<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      data() {
          return {
            scroll: null
          }
      },
      props: {
          probeType: {
            type: Number,
            default: 0
          },
          pullUpLoad: {
            type: Boolean,
            default: false
          }

      },
      // methods: {
      //   //上拉加载更多完成。可以进行下一次加载
      //   finishPullUp() {
      //     this.scroll.finishPullUp()
      //   }
      // },
      mounted() {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            mouseWheel: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad,
          })
        // 实时监听位置
        this.scroll.on('scroll', (position) => {
         this.$emit('scrollPosition', position)
        })
        //监听滚到底部
        if(this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }

        console.log(this.scroll)

      },
      methods: {
          refresh() {
            this.scroll.refresh()
          }
      }
    }
</script>

<style scoped>

</style>
