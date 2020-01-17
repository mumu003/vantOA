<template>
  <div class="point-event main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-search v-model="eventObj.name" placeholder="请输入人员姓名" show-action @search="filter">
      <div slot="action" @click="filter">筛选</div>
    </van-search>
    <!-- <van-cell title="开始时间" is-link :value="eventObj.starTime" @click="show = true"/>
    <van-calendar v-model="startShow" color="#1989fa" @confirm="startConfirm" />
    <van-cell title="结束时间" is-link :value="eventObj.endTime" @click="show = true" />
    <van-calendar v-model="endShow" color="#1989fa" @confirm="endConfirm" /> -->


    <van-cell title="选择日期区间" :value="date" @click="show = true" is-link required/>
    <van-calendar v-model="show" color="#1989fa" @confirm="onConfirm" type="range" :min-date="minTime"/>


    <div class="main-box">
      <van-loading size="24px" v-show="loading">加载中...</van-loading>
      <div class="no-data" v-if="loadFinished" style="text-align:center;font-size:14px">暂无数据</div>
      <div class="event-item" v-for="(item,index) in list" :key="index" v-else>
          <div class="user-info">
              <span>{{item.name}}</span>
              <span class="time">{{item.auditTime}}</span>
          </div>
          <div class="event-info">
              <span class="name">奖扣标准</span>
              <span>{{item.rname}}</span>
              <span>{{item.score}}分</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
 import { findPointEvent } from "@/api/integral";
  export default {
    name: 'PointEvent',
    data() {
      return {
        title: '积分事件',
        isLeftArrow: true,
        startShow: false,
        endShow: false,
        eventObj:{
            name: '',
            starTime: '',
            endTime: '',
        },
        list: [],
        loadFinished:false,
        date: '',
        show: false,
        minTime:new Date(2019,0,1),
        loading:false,
      }
    },
    methods: {
      async filter() {
        if(this.eventObj.starTime == ""){
          this.$toast.fail("请选择起始时间");
          return;
        }
        else{
          this.loading = true;
          await findPointEvent(this.eventObj).then(res=>{
            if(res.code==0){
              setTimeout(() => {
                this.loading = false;
                if(res.data.length==0){
                  this.loadFinished = true;
                }else{
                  this.loadFinished = false;
                  this.list = res.data;
                }
              }, 800);
            }
          })
        }
          
      },
      // 格式化日期
      formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      },
      // startConfirm(time) {
      //   this.startShow = false;
      //   this.eventObj.starTime = this.formatDate(time);
      // },
      // endConfirm(time) {
      //   this.endShow = false;
      //   this.eventObj.endTime = this.formatDate(time);
      // },
      onConfirm(val){
        // this.date = val;
        this.eventObj.starTime = this.formatDate(val[0]);
        this.eventObj.endTime = this.formatDate(val[1]);
        this.date = this.eventObj.starTime + '~' + this.eventObj.endTime;
        this.show = false;
      }
    }
  }

</script>

<style lang="scss" scoped>
 @mixin flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .point-event {
      .main-box{
          margin-top: 10px;
          height: calc(100vh - 215px);
          overflow-y: scroll;
      }
      .no-data{
        text-align: center;
        font-size: 16px;
        color: #666;
      }
      .event-item{
          font-size: 16px;
          background: #fff;
          padding: 10px 15px;
          margin-bottom: 10px;
          .user-info{
              @include flex;
              margin-bottom: 20px;
              .time{
                color: #666;
              }
          }
          .event-info{
              @include flex;
              color: #666;
              .name{
                  color:  #60ca6e;
              }
          }
      }
  }

</style>

<style lang="scss">
  .point-event {
      
    .van-search__action {
      padding: 0 10px;
      background: #1989fa;
      color: #fff;
      margin: 0 5px;
      border-radius: 2px;
    }
  }

</style>
