<template>
  <div class="point-rank main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-cell title="选择日期区间" required is-link :value="date" @click="dateShow = true" />

    <van-calendar v-model="dateShow" type="range" color="#1989fa" @confirm="dateConfirm" />

    <van-tabs v-model="activeTab" color="#1989fa" @click="rankClick">
      <van-tab title="员工排名">
        <div class="rank-item" v-for="(item1,index1) in rankList" :key="index1">
          <span class="num">{{index1+1}}</span>
          <span class="name">{{item1.name}}</span>
          <span class="score">{{item1.score}}分</span>
        </div>
      </van-tab>
      <van-tab title="部门排名">
        <div class="rank-item" v-for="(item2,index2) in rankList" :key="index2">
          <span class="num">{{index2+1}}</span>
          <span class="name">{{item2.name}}</span>
          <span class="score">{{item2.score}}分</span>
        </div>
      </van-tab>
      <van-tab title="规则排名">
        <div class="rank-item" v-for="(item3,index3) in rankList" :key="index3">
          <span class="num">{{index3+1}}</span>
          <span class="name">{{item3.name}}</span>
          <span class="score">{{item3.score}}分</span>
        </div>
      </van-tab>
    </van-tabs>
    <van-loading size="24px" v-show="loading">加载中...</van-loading>
    <div class="no-data" v-if="loadFinished">查无数据</div>
  </div>
</template>

<script>
  import {
    getRank
  } from "@/api/integral";
  export default {
    name: 'PointRank',
    data() {
      return {
        title: '积分排名',
        isLeftArrow: true,
        dateShow: false,
        date: '请选择',
        rankObj: {
          type: 1, //1：员工排名 2：部门排名 3：规则排名
          startTime: '',
          endTime: ''
        },
        activeTab: 0,
        rankList: [],
        loadFinished:false,
        loading:false
      }
    },
    methods: {
      // 格式化日期
      formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      },
      dateConfirm(date) {
        const [start, end] = date
        this.dateShow = false
        this.rankObj.startTime = this.formatDate(start)
        this.rankObj.endTime = this.formatDate(end)
        this.date = `${this.formatDate(start)} ~ ${this.formatDate(end)}`
        this.getRank()
      },
      async getRank() {
        this.loading=true
        await getRank(this.rankObj).then(res => {
          if (res.code == 0) {
            setTimeout(()=>{
              this.loading=false
              if(res.data.list.length==0){
                this.loadFinished=true
              }else{
                this.loadFinished=false
                this.rankList = res.data.list
              }
            })
          }
        })
      },
      rankClick() {
        if (this.activeTab == 0) {
          this.rankObj.type = 1 //员工
        } else if (this.activeTab == 1) {
          this.rankObj.type = 2 // 部门
        } else {
          this.rankObj.type = 3 // 规则
        }
        if (this.rankObj.startTime != '' && this.rankObj.endTime != '') {
          this.getRank()
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .point-rank {
    .van-tabs {
      margin-top: 6px;
      margin-bottom: 10px;
    }

    .rank-item {
      font-size: 18px;
      display: flex;
      padding: 10px 15px;
      justify-content: flex-start;
      ;
      align-items: center;
      position: relative;
      border-bottom: 1px solid #eee;

      .num {
        font-weight: bold;
        margin-top: 5px;
      }

      .num:nth-child(1) {
        color: #FFBE00;
      }

      .num:nth-child(2) {
        color: #00B3FF;
      }

      .num:nth-child(3) {
        color: #F88E31;
      }

      .name {
        margin-left: 12px;

      }

      .score {
        position: absolute;
        right: 15px;
        font-size: 16px;
      }
    }

    .rank-item:last-child {
      border-bottom: none;
    }

  }

</style>
<style lang="scss">
  .point-rank {
    .van-tabs__content {
      background: #fff;
    }
  }

</style>
