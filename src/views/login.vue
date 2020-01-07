<template>
  <div class="container">
    <form class="login-form" novalidate @submit.stop.prevent="login">
      <input type="text" v-model="user.loginName">
      <input type="password" v-model="user.pwd">
      <van-button type="info">登录</van-button>
      <p class="aa">这是16px的字</p>
    </form>
    <van-cell-group>
      <van-cell title="单元格" value="内容" ></van-cell>
      <van-cell title="单元格" value="内容" label="描述信息" ></van-cell>
    </van-cell-group>
    <van-cell title="选择单个日期" :value="date" @click="show = true" ></van-cell>
    <van-calendar v-model="show" @confirm="onConfirm" ></van-calendar>
  </div>
</template>

<script>
  import {login} from "../api/user";
  import * as types from '../store/types';

  export default {
    name: "login",
    data() {
      return {
        user: {
          loginName: '',
          pwd: '',
        },
        date: '',
        show: false
      }
    },
    mounted() {
      let token = this.$store.state.token;
      if(token){
        console.log('已有token，直接进入')
        this.$router.push({
          path:'home',
        })
      }
    },
    methods: {
      formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
      async login() {
        await login(this.user).then(
          (res)=>{
            if(res.code === 0){
              this.$store.commit(types.LOGIN, res.data);
              this.$router.push({
                path:'home',
              })
            }
          }
        )
      }
    }
  }
</script>

<style lang="scss">
  .login-form{
    .aa{
        font-size: 16px;
      }
  }
</style>
