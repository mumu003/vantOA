<template>
  <!-- 管理中心 -->
  <div class="container">
    <nav-bar :title='title'></nav-bar>
    <div v-if="$route.meta.manageShow" class="main-cnt manage-page" style="max-height:calc(100vh - 45px);overflow-y:scroll">
      <van-row class="oa-cnt">
        <div class="m-type">OA</div>
        <div >
          
        </div>
        <van-col class="content-item" span="6" v-for="(item,index) in menuList(1)" :key="index" @click="switchMenu(item)" v-if="item.meta.roleIds.indexOf(userInfo.roleId) != -1">
          <div class="manage-box">
            <img :src="`/static/img/manage/${item.meta.img}.png`" class="icon" />
          </div>
          <p>{{item.name}}</p>
        </van-col>
      </van-row>
      <van-row class="jx-cnt">
        <div class="m-type">绩效相关</div>
        <van-col class="content-item" span="6" v-for="(item,index) in menuList(2)"  :key="index" @click="switchMenu(item)" v-if="item.meta.roleIds.indexOf(userInfo.roleId) != -1">
          <div class="manage-box">
            <img :src="`/static/img/manage/${item.meta.img}.png`" class="icon" />
          </div>
          <p>{{item.name}}</p>
        </van-col>
      </van-row>
    </div>
    <tab-bar v-show="$route.meta.manageShow"></tab-bar>
    <router-view></router-view>
  </div>
</template>
<script>
  import menus from "@/router/menus.js"
  export default {
    data() {
      return {
        title: '管理中心',
        menus: menus,
        userInfo:""
      }
    },
    computed: {
      // 获取当前路由的子路由
      routes() {
        var routes = {
          children: this.$router.options.routes
        };
        var route = this.$route.matched;
        for (var i = 0; i < route.length - 1; i++) {
          routes = routes.children.find((e) => (e.name == route[i].name));
        }
        return routes.children
      },
      menuList() {
        return (type) => {
          let newData = []
          this.menus.forEach(item => {
            if(item.meta.type == type) {
             newData.push(item)
            }
          });
          return newData
        }
      }
    },
    mounted() {
      this.userInfo = this.$store.state.userinfo;
      // console.log(this.$router.options.routers )
    },
    methods: {
      switchMenu(item) {
        this.$router.push({
          path: item.path,
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  $color-blur:#1989fa;
  $color-white:#ffffff;

  @mixin flex {
    display: flex;
    align-items: center;
  }

  @mixin ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }


  .container { 
    .manage-page{
      background: #ffffff;
    }
    .m-type {
      width: 100%;
      padding: 10px 15px;
      color: #666;
      font-size: 16px;
    }

    .jx-cnt {
      margin-top: 10px;
    }

    .oa-cnt .manage-box {
      background: #F3BB11;
    }

    .jx-cnt .manage-box {
      background: #1989fa;
    }

    .van-row {
      @include flex;
      flex-wrap: wrap;
      font-size: 14px;

      .content-item {
        flex-direction: column;
        border: 1px solid #eee;
      }

      .manage-box {
        display: flex;
        justify-content: center;
        margin: 20px;
        margin-bottom: 5px;
        padding: 8px 0;
        border-radius: 6px;

        img {
          width: 32px;
          height: 32px;
        }
      }

      .icon {
        // 
      }

      p {
        padding-bottom: 15px;
        text-align: center;
      }
    }
  }

</style>
