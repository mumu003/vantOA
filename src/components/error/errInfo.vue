<template>
  <div class="err-container">
    <!-- <img class="error-bg" src="/static/img/error/error_bg.jpg" alt=""> -->
    <img class="error_cloud" src="/static/img/error/error_cloud.png" alt="">
    <div class="img404">
      <img src="/static/img/error/404.png" alt="">
    </div>
    <p class="error-msg">很抱歉，发生了一些意想不到的错误</p>
    <div class="to_index">
      <van-button type="default" @click="$router.push('/manager')">返回管理中心</van-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.err-container{
  width: 100%;
  height: 100vh;
  background-image: url('/static/img/error/error_bg.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .error_cloud{
    height: 170px;
    position: absolute;
    bottom: 0;
  }
  .img404,
  .to_index{
    width: 150px;
    margin: 0px auto;
    padding-top: 80px;
    img{
      width: 100%;
    }
  }
  .error-msg{
    color: #fff;
    font-size: 16px;
    margin: 20px 0;
    text-align: center;
  }
  .to_index{
    width: 120px;
    text-align: center;
  }
}
</style>