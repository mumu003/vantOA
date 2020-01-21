<template>
    <div class="taskManage">
      <van-nav-bar class="oa-nav" :title="'任务管理'" left-arrow right-text="发布任务" @click-left="$router.go(-1);" @click-right="base = false;showinput = false;release = true" />
      <!-- <nav-bar :title='title' :isLeftArrow='isLeftArrow' :rightText="rightText" @click-right="aaa"></nav-bar> -->
      <div class="tasks" v-if="base">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <div class="task" v-for="(item,index) in list" :key="item+index" >
            <div class="row first" @click="updateTitle(item)">
              <p>{{item.title}}</p>
              <van-icon name="cross" size="0.4rem" @click.stop="deleteTask(item)" />
            </div>
            <div class="row second" @click="updateContent(item)">
              <p>{{item.content}}</p>
            </div>
            <div class="row last">
              <div>
                <p class="time">发布时间：<span>{{item.createTime | formtime}}</span></p>
                <p class="time">结束时间：<span>{{item.endDate | formtime}}</span></p>
              </div>
              <div class="btn-row" v-if="item.degree == 0">
                <van-tag plain type="success" @click.stop="finish(item)" style="margin-right:8px;">已完成</van-tag>
                <van-tag plain type="warning" @click.stop="finish(item)">未完成</van-tag>
              </div>
              <div class="btn-row" v-else>
                <span v-if="item.degree == 1" class="passed">已完成</span>
                <span v-else-if="item.degree == 2" class="rejected">未完成</span>
              </div>
            </div>
          </div>
        </van-list>
      </div>

      <!-- 修改 -->
      <!-- <div class="update-modal" v-if="showinput">
        <van-nav-bar :title="setTitle" left-arrow right-text="保存" @click-left="back" @click-right="save" />
        <van-cell-group>
          <van-field v-model="activeItem.title" placeholder="请输入任务标题" v-show="isSetTitle" />
          <van-field v-model="activeItem.content" rows="3" v-show="isSetContent"
            autosize label="内容" type="textarea" maxlength="50" placeholder="请输入任务内容" show-word-limit />
        </van-cell-group>
      </div> -->

      <van-dialog v-model="showinput" :title="setTitle" show-cancel-button @confirm="save">
        <van-field v-model="activeItem.title" label="任务标题" center clearable placeholder="请输入任务标题"  v-show="isSetTitle"></van-field>
        <van-field v-model="activeItem.content" rows="3" v-show="isSetContent"
          autosize label="任务内容" type="textarea" maxlength="50" placeholder="请输入任务内容" show-word-limit />
        <!-- <van-button slot="button" size="small" type="info" @click="addintegral">确认</van-button> -->
        
      </van-dialog>

      <!-- 发布任务 -->
      <ReleaseTask v-if="release" @back="releaseBack"></ReleaseTask>
    </div>
</template>
<script>
import { formdatatime } from "@/util/base";
import { findByAdmin,updateStatus,deleteTasks,updateTitle,updateContent } from "@/api/admin.js";
import ReleaseTask from '../Management/task'
export default {
  components:{ ReleaseTask },
  data(){
    return{
      title:"任务管理",
      isLeftArrow:true,
      rightText:"发布任务",
      base:true,
      showinput:false,
      release:false,
      list: [],
      taskList:[],

      loading: false,
      finished: false,
      limit:3,
      count:0,

      // 发布任务
      sendTask:false,
      // 修改任务
      setTitle:"",
      isSetTitle:false,
      isSetContent:false,
      activeItem:"",
      taskTitle:"",
      taskContent:"",
    }
  },
  mounted(){
    this.getMask();
  },
  filters: {
    formtime(val) {
      if(val){
        return formdatatime(val);
      }
      
    }
  },
  methods:{
    onLoad() {
      // console.log("list---",this.list)
      this.count += 1;
      this.list = this.taskList.slice(0,this.limit * this.count)
      if(this.limit * this.count > this.taskList.length){
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
          this.list = this.taskList.slice(0,3);
        }
      });
    },
    // 已完成 / 未完成
    async finish(item){
      // console.log(item);
      this.$dialog.confirm({
        closeOnPopstate:true,
        title: "确认",
        message: "是否继续该操作？"
      }).then(() => {
        var degree = item.degree;
        item.degree = item.degree == "1" ? '2' :'1';
        updateStatus(item).then(res => {
          if(res.code == 0){
            this.$toast.success({
              message: "操作成功",
              duration: 1000
            });
          }
        })

      }).catch(() => {
          // on cancel
      });
    },
    // 编辑
    // showModal(item){
    //   this.activeitem = JSON.parse(JSON.stringify(item));
    //   this.showinput = true;
    // },
    // 删除任务
    deleteTask(item){
      this.$dialog.confirm({
        closeOnPopstate:true,
        title: "删除",
        message: "确定要删除吗？"
      }).then(() => {
         this.goDelete(item);
      }).catch(() => {
          // on cancel
      });
    },
    async goDelete(item){
      await deleteTasks({id:item.id}).then(res => {
        if(res.code == 0){
          this.$toast.success({
            message:'删除成功',
            duration:1000
          })
          setTimeout(() => {
            this.reset();
            this.getMask();
          },1500)   
        }
      })
    },
    updateTitle(item) {
      if(item.degree == "0"){
        this.setTitle = '修改任务标题';
        // this.base = false;
        this.showinput = true;
        this.release = false;
        this.isSetTitle = true;
        this.isSetContent = false;
        this.activeItem =JSON.parse(JSON.stringify(item));
      }
    },
    updateContent(item) {
      if(item.degree == "0"){
        this.setTitle = '修改任务内容';
        // this.base = false;
        this.showinput = true;
        this.release = false;
        this.isSetTitle = false;
        this.isSetContent = true;
        this.activeItem = JSON.parse(JSON.stringify(item));
      }
    },
    // 保存
    async save() {
      if (this.isSetTitle) {
        await updateTitle(this.activeItem).then(res => {
          if(res.code == 0){
            this.successTip();
          }
        })
      }else if (this.isSetContent) {
        await updateContent(this.activeItem).then(res => {
          if(res.code == 0){
            this.successTip();
          }
        })
      }
    },
    successTip(){
      this.$toast.success({
        message:'修改成功',
        duration:1000
      })
      setTimeout(()=>{
        this.showinput = false;
        this.isSetTitle = false;
        this.isSetContent = false;
        this.getMask();
        this.reset();
      },800)
    },
    reset(){
      this.limit = 3;
      this.count = 0;
      this.loading = true;
      this.finished = false;
      this.list = [];
      this.onLoad();
    },
    releaseBack(){
      this.inputshow = false;
      this.release = false;
      this.base = true;
      this.getMask();
      this.reset();
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.taskManage{
  position: absolute;
  top: 0;
  width: 100%;
  .oa-nav{
    height: 1.40625rem;
    background: #1989fa;
    color: #fff;
    .van-icon,
    .van-nav-bar__title,
    .van-nav-bar__text{
      color: #fff;
    }
  }
  .tasks {
    .van-list{
      height: calc(100vh - 55px);
      overflow-y: scroll;
      .task {
        font-size: 0.675rem /* 14/16 */;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 5px #ccc;
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
        @include flex;
        justify-content: space-between;
        .btn-row{  
          @include flex;
          justify-content: center;
          font-size: 16px;
          .van-tag--plain{
            // margin: 0 3px;
          }
          .van-tag{
            font-size:12px;
            padding: 8px 8px;
          }
        }
        
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