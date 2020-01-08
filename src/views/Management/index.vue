<template>
  <!-- 管理中心 -->
  <div class="container">
    <tab-bar></tab-bar>
    <div v-if="$route.meta.manageShow">
      <van-row>
        <van-col :span="24">OA</van-col>
      </van-row>
      <van-row>
        <van-col class="content-item" span="6" v-for="(item,index) in menus" :key="index" @click="switchMenu(item)">
          <img :src="svg" class="icon"/>
          <p>{{$route.meta.manageShow}}</p>
          <p>{{item.name}}</p>
          <button @click="aaa">测试</button>
        </van-col>
      </van-row>
    </div>
    
    <router-view></router-view>
  </div>
</template>
<script>
import menus from "@/router/menus.js"
export default {
  data(){
    return{
      svg:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0yMjgzY2JhYz0iIiBkYXRhLXYtNmJiYmI3ZjU9IiIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBjbGFzcz0ibWVudS1pY29uIHN2Zy1pY29uIGljb24tcnVsZXMiIGRhdGEtdi04Mzg4ZWNjYz0iIj48cGF0aCBkYXRhLXYtMjI4M2NiYWM9IiIgZD0iTTEyMy4xIDEyaDc3Ny44YzYxLjQgMCAxMTEuMSA0OS43IDExMS4xIDExMS4xdjc3Ny44YzAgNjEuNC00OS43IDExMS4xLTExMS4xIDExMS4xSDEyMy4xQzYxLjcgMTAxMiAxMiA5NjIuMyAxMiA5MDAuOVYxMjMuMUMxMiA2MS43IDYxLjcgMTIgMTIzLjEgMTJ6IiBmaWxsPSIjRjNCQjExIiBzdHJva2U9InRyYW5zcGFyZW50Ij48L3BhdGg+PHBhdGggZGF0YS12LTIyODNjYmFjPSIiIGQ9Ik01MjEuMiAzOTQuOWMtMjkgMC01Mi42LTIzLjUtNTIuNi01Mi42czIzLjUtNTIuNiA1Mi42LTUyLjYgNTIuNiAyMy41IDUyLjYgNTIuNi0yMy42IDUyLjYtNTIuNiA1Mi42bTAgMTU5LjdjLTI5IDAtNTIuNi0yMy41LTUyLjYtNTIuNiAwLTI5IDIzLjUtNTIuNiA1Mi42LTUyLjZzNTIuNiAyMy41IDUyLjYgNTIuNmMtMC4xIDI5LjEtMjMuNiA1Mi42LTUyLjYgNTIuNm0wIDE1Ni4zYy0yOSAwLTUyLjYtMjMuNS01Mi42LTUyLjYgMC0yOSAyMy41LTUyLjYgNTIuNi01Mi42czUyLjYgMjMuNSA1Mi42IDUyLjZjLTAuMSAyOS4xLTIzLjYgNTIuNi01Mi42IDUyLjZtMjM0LjEtNDgwLjFIMjk5LjljLTIwLjkgMC4xLTM3LjkgMTgtMzcuOSA0MC4xdjQ4MC43YzAuMSAyMi4xIDE3IDQwIDM3LjkgNDAuMWg0NTUuNGMyMC45LTAuMSAzNy45LTE4IDM3LjktNDAuMVYyNzAuOGMwLTIyLjEtMTctNDAtMzcuOS00MCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSJ0cmFuc3BhcmVudCI+PC9wYXRoPjwvc3ZnPg==",
      menus:menus,
    }
  },
  computed: {
    // 获取当前路由的子路由
    routes(){
      var routes = {
        children: this.$router.options.routes
      };
      var route = this.$route.matched;
      for(var i=0; i<route.length-1; i++){
        routes = routes.children.find((e) => (e.name == route[i].name));
      }
      return routes.children
    }
  },
  mounted(){
    // console.log("123",menus)
    // console.log(this.$router.options.routers )
  },
  methods:{
    aaa(){
      console.log(this.routes)
    },
    switchMenu(item){
      this.$router.push({
        path:item.path,
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$color-blur:#1989fa;
$color-white:#fff;
@mixin flex{
  display: flex;
  align-items: center;
}
@mixin ellipsis{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}


.container{
  .van-row{
    @include flex;
    flex-wrap: wrap;
    font-size: 14px;
    .content-item{
      padding: 10px;
      border: 1px solid #eee;
    }
    .icon{
      // 
    }
    p{
      margin: 0;
      text-align: center;
    }
  }
}

</style>

