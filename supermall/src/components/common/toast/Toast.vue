<template>
    <div class="Toast" v-show="IsShow">
      {{message}}
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data() {
          return {
           message: '',
           IsShow: false
          }
        },
        methods: {
          show(message, duration = 2000) {
            console.log(55);
            console.log(message);
            this.IsShow = true;
            this.message = message;
            setTimeout(() => {
              this.IsShow = false;
              this.message = '';

            }, duration)

          }
        }
        // props: {
        //   message: {
        //     type: String,
        //     default: ''
        //   },
        //   show: {
        //    type: Boolean,
        //    default: true
        //   }
        // }
    }
</script>

<style scoped>
.Toast {
   position: fixed;
   top: 50%;
   left: 50%;
   padding: 10px 10px;
   transform: translate(-50%, -50%);
   z-index: 999;

   color: white;
   background-color: rgba(0, 0, 0, .75);
 }
</style>
