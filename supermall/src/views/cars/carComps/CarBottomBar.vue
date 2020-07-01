<template>
  <div class="bottom-bar">
    <div class="check-Content">
      <CheckButton class="check-button" :is-checked="selectAll" @click.native="selectClick"></CheckButton>
      <span>全选</span>
    </div>
     <div class="total-price">
     <span >合计:{{TotalPrice}} </span>
     </div>

    <div class="buy-product" @click="calcClick">
      <span>去计算({{checkedLength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CarButtonBar",
    components: {
      CheckButton
    },
    computed: {
    ...mapGetters(['carList']),
     TotalPrice() {
       return '￥' +  this.$store.state.carList.filter(item => {
         return item.checked
       }).reduce((preValue, item) => {
         return preValue + item.price * item.count
       }, 0).toFixed(2)
     },

     checkedLength() {
       return this.$store.state.carList.filter( item => {
         return item.checked
       }).length
     },
     //判断是否全部选中
     selectAll() {
       if(this.carList.length ===0) return false
       return !this.carList.find(item => !item.checked)
     }
    },
    methods: {
      selectClick() {
        if (this.selectAll) { //全部选中
          this.carList.forEach(item => item.checked = false)
        }else { //有部分或全部未选中
          this.carList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (!this.selectAll) {
           this.$toast.show("请选择购买商品", 1500)
        }
      }
    }


  }
</script>

<style scoped>

  .bottom-bar {
    display: flex;
    height:40px;
    width: 100%;
    bottom: 49px;
    background-color: #999999;
    position: absolute;
    line-height: 40px;
      }
  .check-Content{
     display: flex;
     align-items: center;
     margin-left: 10px;
     width: 70px;
  }
  .check-button {
      width: 20px;
      height: 23px;
      line-height: 20px;
      margin-right: 5px;
  }
  .total-price {
   margin-left: 20px;
   flex: 1;
  }
  .buy-product {
   width: 90px;
   background-color: orangered;
  }

</style>
