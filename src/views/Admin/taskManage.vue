<template>
    <div class="taskManage main-cnt">
      <nav-bar :title='title' :isLeftArrow='isLeftArrow' ></nav-bar>
      
      <div class="tasks" v-if="!showinput">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <div class="task"  @click="showmodal(item)" v-for="(item,index) in list" :key="item+index" >
            <div class="row first">
              <p>{{item.title}}</p>
              <van-icon name="cross" size="0.4rem" @click.stop="deleteTask(item)" />
            </div>
            <div class="row second">
              <p>{{item.content}}</p>
            </div>
            <div class="row last">
              <p class="time">发布时间：<span>{{item.createTime | formtime}}</span></p>
              <p class="time">结束时间：<span>{{item.endDate | formtime}}</span></p>
            </div>



            <!-- <div class="row first">
              <p>{{item.title}}</p>
              <van-icon name="cross" size="0.4rem" @click.stop="deleteTask(item)" />
            </div>
            <div class="row second">
              <p>{{item.content}}</p>
            </div>
            <div class="row last">
              <p class="time">发布时间：<span>{{item.createTime | formtime}}</span></p>
            </div> -->
          </div>
        </van-list>
      </div>
    </div>
</template>
<script>
import { formdatatime } from "@/util/base";
import { findByAdmin } from "@/api/admin.js";
export default {
  data(){
    return{
      title:"任务管理",
      isLeftArrow:true,
      showinput:false,
      list: [],
      taskList:[],

      loading: false,
      finished: false,
      limit:3,
      count:0,
    }
  },
  mounted(){
    this.getMask();
  },
  filters: {
    formtime(val) {
      return formdatatime(val);
    }
  },
  methods:{
    onLoad() {
      console.log("list---",this.list)
      this.count += 1;
      this.list = this.taskList.slice(0,this.limit * this.count)
      // console.log(this.limit * this.count)
      if(this.limit * this.count > this.taskList.length){
        // console.log("到底了")
        this.list = this.taskList.slice(0,this.taskList.length)
      }
      // 异步更新数据
      setTimeout(() => {
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length == this.taskList.length) {
          this.finished = true;
        }
      }, 1000);
    },
    async getMask() {
      await findByAdmin().then(res => {
        if (res.code == 0) {
          this.taskList = res.data;
          this.list = this.taskList.slice(0,3)
        }
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.taskManage{
  .tasks {
    .van-list{
      height: calc(100vh - 95px);
      overflow-y: scroll;
      .task {
        font-size: 0.675rem /* 14/16 */;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 5px#ccc;
        margin: 15px 10px;
      }
      .row{
        display: flex;
        align-items: center;
        margin: 0 10px;
        p{
          font-size: 16px;
          // text-align: right;
          margin: 0.25rem 0rem;
        }
      }
      .first{
        justify-content: space-between;
        p{
          font-size: 18px;
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .second{
        justify-content: flex-start;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        p{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .last{
        display: block;
        padding:5px 10px;
        margin: 0;
        .time{
          font-size: 14px;
          color: #999;
          margin: 5px 0;
        }
      }
    }
  }
}


</style>