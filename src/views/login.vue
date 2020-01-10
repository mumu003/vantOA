<template>
  <div class="container">
    <div id="top">
      <p class="name">xxxxxx</p>
      <p class="title">积分管理系统</p>
    </div>
    <div id="contain">
        <van-cell-group>
          <van-field value="请输入员工姓名" label="姓名" left-icon="contact" v-model="user.loginName" />
          <van-field value="请输入员工密码" label="密码" left-icon="contact" v-model="user.pwd"  type="password"/>
        </van-cell-group>
        <van-checkbox v-model="remember">记住我</van-checkbox>
        <div class="submit">
          <van-button type="info" @click="login">登录</van-button>
        </div>
        <!-- <input type="text" >
        <input type="password" >
        <van-button type="info">登录</van-button>
        <p class="aa">这是16px的字</p> -->
    </div>
    
   
  </div>
</template>

<script>
  import { login } from "../api/user";
  import * as types from '../store/types';

  export default {
    name: "login",
    data() {
      return {
        user: {
          loginName: '',
          pwd: '',
        },
        remember:false,
      }
    },
    created(){
      if(localStorage.getItem("user")){
				this.remember = true;
				this.user = JSON.parse(localStorage.getItem("user"));
			}else{
				this.remember = false;
				this.user.loginName = ""
				this.user.pwd = ""
			}
    },
    mounted() {
      /**
       * tls 1.10
       * 取消自动登录
       */
      // let token = this.$store.state.token;
      // if(token){
      //   console.log('已有token，直接进入')
      //   this.$router.push({
      //     path:'manager',
      //   })
      // }
    },
    methods: {
      login() {
        if(this.remember){
				// 	// 记住密码
					localStorage.setItem("user",JSON.stringify(this.user));
				}else{
					if(localStorage.getItem("user")){
            localStorage.removeItem("user")
					}
				}
        login(this.user).then(res => {
          if(res.code === 0){
            /**
             * tls 1.10 
             * 登录成功时添加当前时间
             * 获取token并重置有效期为24个小时
             */
            this.setStorage("login",res.data.token);
            this.getStorage("login",1000*60*60*24,true);
            // this.$store.commit(types.LOGIN, data);
            this.$router.push({
              path:'/manager',
            })
          }else{
            this.$toast.fail(res.msg);
          }
        })
      }
    },
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
  #top{
    height: 35vh;
    min-height: 150px;
    background: $color-blur;
    color: $color-white;
    text-align: center;
    @include flex;
    flex-direction: column;
    justify-content: center;
    p{
      width: 100%;
      margin: 5px 0;
      font-size: 20px;
      @include ellipsis;
    }
    .name{
      font-size: 30px;
    }
  }
  #contain{
    .van-cell-group{
      // margin: 10px 0;
      &::after{
        content:unset;
      }
      .van-cell{
        // border-bottom: 1px solid #eee;
        // &::after{
        //   content:unset;
        // }
        .van-cell__title {
          width: 40px;
        }
      }
    }
    .van-checkbox{
      padding: 0.3125rem 0.5rem;
      font-size: 14px;
    }
    .submit{
      padding: 0.3125rem 0.5rem;
      @include flex;
      justify-content: center;
      button{
        width: 100%;
      }
    }
  }
}
  .login-form{
    .aa{
        font-size: 16px;
      }
  }
</style>
