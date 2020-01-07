<template>
  <!-- 管理中心 -->
  <div class="container">
    <van-row>
      <van-col :span="24">OA</van-col>
    </van-row>
    <van-row>
      <van-col class="row" span="6" v-for="(item,index) in 6" :key="index">
        <img :src="svg" class="icon"/>
        <p>组织架构</p>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      svg:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0yMjgzY2JhYz0iIiBkYXRhLXYtNmJiYmI3ZjU9IiIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBjbGFzcz0ibWVudS1pY29uIHN2Zy1pY29uIGljb24tcnVsZXMiIGRhdGEtdi04Mzg4ZWNjYz0iIj48cGF0aCBkYXRhLXYtMjI4M2NiYWM9IiIgZD0iTTEyMy4xIDEyaDc3Ny44YzYxLjQgMCAxMTEuMSA0OS43IDExMS4xIDExMS4xdjc3Ny44YzAgNjEuNC00OS43IDExMS4xLTExMS4xIDExMS4xSDEyMy4xQzYxLjcgMTAxMiAxMiA5NjIuMyAxMiA5MDAuOVYxMjMuMUMxMiA2MS43IDYxLjcgMTIgMTIzLjEgMTJ6IiBmaWxsPSIjRjNCQjExIiBzdHJva2U9InRyYW5zcGFyZW50Ij48L3BhdGg+PHBhdGggZGF0YS12LTIyODNjYmFjPSIiIGQ9Ik01MjEuMiAzOTQuOWMtMjkgMC01Mi42LTIzLjUtNTIuNi01Mi42czIzLjUtNTIuNiA1Mi42LTUyLjYgNTIuNiAyMy41IDUyLjYgNTIuNi0yMy42IDUyLjYtNTIuNiA1Mi42bTAgMTU5LjdjLTI5IDAtNTIuNi0yMy41LTUyLjYtNTIuNiAwLTI5IDIzLjUtNTIuNiA1Mi42LTUyLjZzNTIuNiAyMy41IDUyLjYgNTIuNmMtMC4xIDI5LjEtMjMuNiA1Mi42LTUyLjYgNTIuNm0wIDE1Ni4zYy0yOSAwLTUyLjYtMjMuNS01Mi42LTUyLjYgMC0yOSAyMy41LTUyLjYgNTIuNi01Mi42czUyLjYgMjMuNSA1Mi42IDUyLjZjLTAuMSAyOS4xLTIzLjYgNTIuNi01Mi42IDUyLjZtMjM0LjEtNDgwLjFIMjk5LjljLTIwLjkgMC4xLTM3LjkgMTgtMzcuOSA0MC4xdjQ4MC43YzAuMSAyMi4xIDE3IDQwIDM3LjkgNDAuMWg0NTUuNGMyMC45LTAuMSAzNy45LTE4IDM3LjktNDAuMVYyNzAuOGMwLTIyLjEtMTctNDAtMzcuOS00MCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSJ0cmFuc3BhcmVudCI+PC9wYXRoPjwvc3ZnPg=="
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  .van-row{
    font-size: 14px;
    .icon{
      padding: 10px;
    }
    p{
      margin: 0;
      text-align: center;
    }
  }
}

</style>

