<template>
<!-- 头部导航 -->
  <van-nav-bar :title="`${title}`" :left-arrow='isLeftArrow' :fixed='isFixed'/>
</template>

<script>
  export default {
    name: 'NavBar',
    props:{
        title:{
            type:String,
            default:''
        },
        isLeftArrow:{
            type:Boolean,
            default:false
        },
        isFixed:{
            type:Boolean,
            default:true
        }
    },
    data() {
      return {

      }
    }
  }

</script>

<style lang="scss" scoped>
.van-nav-bar{
  height: 45px !important;
}
</style>
