<template>
  <div class="home">
    <!-- <div class="user-info">
      <span>2019年11月6日</span>
      <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <span>管理层-Jack</span>
    </div>
    <van-row gutter="10" class="integral-info">
      <van-col span="8">
        <span>100分</span>
        <span>累计总分</span>
      </van-col>
      <van-col span="8">
        <span>200分</span>
        <span>本年积分</span>
      </van-col>
      <van-col span="8">
        <span>100分</span>
        <span>本月积分</span>
      </van-col>
    </van-row>
    <van-tabs v-model="activeTab">
      <van-tab title="奖分图表" name="award">
        <van-row gutter="10" class="time-info">
          <van-col span="8">
            <span>开始时间</span>
            <span>2019-10-6</span>
          </van-col>
          <van-col span="8">

          </van-col>
          <van-col span="8">
            <span>结束时间</span>
            <span>2019-10-6</span>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="扣分图表" name="punish">
        222
      </van-tab>
    </van-tabs>-->
  </div> 
</template>

<script>
  import * as types from "../store/types";

  export default {
    name: "home",
    components: {},
    data() {
      return {
        // activeTab: 'award'
      }
    },
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
