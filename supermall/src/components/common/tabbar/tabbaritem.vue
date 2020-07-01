<template>
    <div class="tab-nar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
<!--        <div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
        <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "tabbaritem",
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'red'

            }
        },
        data(){
            return{
                 // isActive: true,
            }
        },
        computed: {
            isActive() {
                return this.$route.path.includes(this.path) == 1
            },
            activeStyle() {
                return this.isActive ? {color: this.activeColor} : {}
            }
        },
        methods: {
            itemClick() {
               this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>


    .tab-nar-item {
        flex: 1;
        text-align: center;
        height: 49px;

    }
    .tab-nar-item img {

        width: 24px;
        height: 24px;
        margin-top: 3px;
        /*//图片和文字没有空间*/
        vertical-align: middle;

    }
    /*.active {*/
    /*    color: red;*/
    /*}*/
</style>
