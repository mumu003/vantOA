<template>
  <div class="home">
    <div class="user-info">
      <span>2019年11月6日</span>
      <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      <span>管理层-Jack</span>
    </div>
  </div>
</template>

<script>
import * as types from "../store/types";

export default {
  name: "home",
  components: {},
  methods: {
    async logout() {
      console.log("logout");
      this.$store.commit(types.LOGOUT);
      this.$router.push({
        path: "login"
      });
    }
  }
};
</script>
