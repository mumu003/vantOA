<template>
  <div class="home main-cnt">
    <nav-bar :title='title'></nav-bar>
    <!-- 用户信息 -->
    <div class="user-info">
      <van-image round src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579150814844&di=9c18d02255eecfc420c994089535bf2d&imgtype=0&src=http%3A%2F%2Fwww.17qq.com%2Fimg_qqtouxiang%2F71807977.jpeg" />
      <div>
        <span class="user-name">{{userInfo.name}}</span>
        <span class="user-time">{{formatTime(userInfo.createTime)}}</span>
      </div>
      <button>{{userInfo.roleId == 1 ? '超级管理员' : userInfo.roleId == 2 ? '管理员' : '员工'}}</button>
    </div>
    <!-- 积分信息 -->
    <van-row class="integral-info">
      <van-col span="8">
        <span>{{userInfo.score}}</span>
        <span>累计总分</span>
      </van-col>
      <van-col span="8">
        <span>{{sumData.yearSum}}</span>
        <span>本年积分</span>
      </van-col>
      <van-col span="8">
        <span>{{sumData.mothSum}}</span>
        <span>本月积分</span>
      </van-col>
    </van-row>
    <div class="line"></div>
    <!-- 分数详情 -->
    <van-tabs v-model="activeTab" class="score-content">
      <van-tab title="奖励分" name="award">
        <div class="time-info">{{monthStartDate}}-{{nowDate}}</div>
        <!-- <div class="chart">
          <van-circle v-model="currentRate" :rate="rate" :stroke-width="60" text="100分" />
        </div> -->

        <div class="fraction-list">
          <div class="fraction-item" v-for="(item1,index1) in increaseScore" :key="index1">
            <span>{{item1.name}}</span>
            <span class="award-score">+{{item1.score}}分</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="扣分项" name="punish">
        <div class="time-info">{{monthStartDate}}-{{nowDate}}</div>
        <!-- <div class="chart">
          <van-circle v-model="currentRate" :rate="rate" :stroke-width="60" text="100分" />
        </div> -->

        <div class="fraction-list">
          <div class="fraction-item" v-for="(item2,index2) in reduceScore" :key="index2">
            <span>{{item2.name}}</span>
            <span class="punish-score">{{item2.score}}分</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import * as types from "../store/types";
  import { increaseOrReduce, sumScore} from "@/api/user";

  export default {
    name: "home",
    components: {},
    data() {
      return {
        title: '首页',
        activeTab: 'award',
        rate: 100,
        currentRate: 0,
        userInfo: '',
        monthStartDate:'',//本月第一天
        nowDate:'',// 当前时间
        increaseScore:[],//奖分分列表
        reduceScore:[], //扣分列表
        sumData:''// 积分数据
      }
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      getTime(){
        let now = new Date()  
        this.nowDate=this.formatTime(now)
        let nowMonth = now.getMonth()
        let nowYear = now.getFullYear()//本月的开始时间
        this.monthStartDate =this.formatTime(new Date(nowYear, nowMonth, 1))
      },
      getUserInfo() {
        let info = this.$store.state.userinfo
        this.userInfo = info
        this.increaseOrReduce()
        this.sumScore()
        this.getTime()
      },
      // 奖扣分明细
      async increaseOrReduce(){
        await increaseOrReduce().then(res=>{
          if(res.code==0){
            this.increaseScore=res.data.increaseScore
            this.reduceScore=res.data.reduceScore
          }
        })
      },
      // 积分明细
      async sumScore(){
        await sumScore().then(res=>{
          if(res.code==0){
            this.sumData=res.data
          }
        })
      },
      formatTime(date) {
        var date = new Date(date)
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        return year + '.' + month + '.' + day 
      },
      async logout() {
        this.$store.commit(types.LOGOUT);
        this.$router.push({
          path: "login"
        });
      }
    }
  };

</script>

<style lang="scss" scoped>
  .home {
    background: #ffffff;

    span {
      display: block;
    }

    .user-info {
      margin: 20px 15px 0 25px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;

      .user-name {
        font-size: 18px;
        font-weight: 500;
      }

      .user-time {
        font-size: 14px;
        color: #999;
        margin-top: 5px;
      }

      button {
        width: 60px;
        height: 28px;
        background: #1989fa;
        box-shadow: 0px 7px 14px 0px rgba(89, 160, 255, 0.35);
        border-radius: 19px;
        border: none;
        color: #ffffff;
        font-size: 14px;
        margin: 0 0 10px 10px;
      }
    }

    .integral-info {
      margin-top: 20px;
    }

    .van-col--8 {
      text-align: center;

      span:first-child {
        font-size: 20px;
      }

      span:last-child {
        font-size: 12px;
        color: #999;
        margin-top: 5px;

      }

    }

    .line {
      width: 100%;
      height: 5px;
      background: #EFEFEF;
      margin-top: 30px;
    }

    .van-tabs__content {
      .chart {
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .time-info {
        margin-top: 15px;
        color: #999;
        font-size: 16px;
      }

      .fraction-list {
        margin-top: 15px;
      }

      .fraction-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
        padding: 10px 0;
        border-bottom: 1px solid #F9FAFB;

        span:first-child {
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 16px;
        }

        span:last-child {
          font-size: 18px;
          font-weight: 500;
        }

        .award-score {
          color: #1989fa;
        }

        .punish-score {
          color: #FF6C02;
        }
      }
    }

  }

</style>

<style lang="scss">
  .home {
    .van-image {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      margin-right: 10px;
    }
    .van-tabs {
      .van-tabs__content {
        padding: 0 20px;
      }
      [class*=van-hairline]::after {
        border: none;
      }
      .van-tabs__wrap {
        padding: 0 80px;
      }
      .van-tab--active .van-tab__text {
        font-size: 16px;
        color: #1989fa;
      }
      .van-tabs__line {
        background: #1989fa;
      }
    }
    .van-circle__text {
      font-size: 18px;
    }
     .score-content{
      .van-tabs__content{
        max-height: calc(100vh - 315px);
        overflow-y: scroll;
      }
    }
  }

</style>
