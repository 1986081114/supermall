<template>
    <div class="wrapper">
      <ul class="content">
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>   <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>   <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>   <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
      </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "category",
        data() {
          return {
            scroll: null
          }
      },
      mounted() {
          this.scroll = new BScroll(document.querySelector('.wrapper'), {
            probeType: 3,
            pullUpLoad: true,
            mouseWheel: true
          })
        this.scroll.on('scroll', (position) => {
          console.log(position)
        }),
          this.scroll.on('pullingUp', () => {
            console.log('上拉加载更多')
          })
      }

    }
</script>

<style scoped>
.wrapper {
  margin-top: 20px;
  height: 150px;
  background-color: #ff5777;

  overflow: hidden;
  /*overflow-y: l*/
}
</style>
