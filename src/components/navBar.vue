<template>
<!-- 头部导航 -->
  <van-nav-bar :title="`${title}`" :left-arrow='isLeftArrow' :fixed='isFixed' @click-left="onClickLeft" class="oa-nav" :right-text="rightText" @click-right="onClickRight"/>
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
        },
        rightText:{
          type:String,
          default:''
        }
    },
    data() {
      return {

      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1);
      },
      onClickRight(){
        
      }
    }
  }

</script>

<style lang="scss" scoped>
.oa-nav{
  height: 45px;
  background: #1989fa;
      .van-nav-bar__title,
      .van-nav-bar__text {
        color: #fff ;
      }
      .van-icon{
        color: #fff;
      }
}
</style>
