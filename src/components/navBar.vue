<template>
<!-- 头部导航 -->
  <van-nav-bar :title="`${title}`" :left-arrow='isLeftArrow' :fixed='isFixed' @click-left="onClickLeft" class="oa-nav"/>
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
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1);
      }
    }
  }

</script>

<style lang="scss" scoped>
.oa-nav{
  height: 45px;
  background: #1989fa;
      .van-nav-bar__title {
        color: #fff ;
      }
      .van-icon{
        color: #fff;
      }
}
</style>
