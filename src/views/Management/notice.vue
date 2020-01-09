<template>
  <div class="page main-cnt">
    <nav-bar :title='title1' :isLeftArrow='isLeftArrow' ></nav-bar>
    <!-- <van-nav-bar title="通知公告" left-text="返回" left-arrow @click-left="onClickLeft" class="bluenav" /> -->
    <van-notice-bar text="公告内容" left-icon="volume-o" color="#1989fa" background="#ecf9ff" />
    
    <div class="notices" v-if="!showinput">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div class="notice"  @click="showmodal(item)" v-for="(item,index) in list" :key="item+index" >
          <div class="row first">
            <p>{{item.title}}</p>
            <van-icon name="cross" size="0.4rem" @click.stop="deletnotice(item)" />
          </div>
          <div class="row second">
            <p>{{item.content}}</p>
          </div>
          <div class="row last">
            <p class="time">发布时间：<span>{{item.createTime | formtime}}</span></p>
          </div>
          
          <!-- <h2> {{item.title}}
            <van-icon name="cross" size="0.4rem" @click.stop="deletnotice(item)" />
          </h2>
          <h4>{{item.content}}</h4>
          <p> 发布时间:
            <span>{{item.createTime | formtime}}</span>
          </p> -->
        </div>
      </van-list>
    </div>

    <div class="update-modal" v-if="showinput">
      <van-nav-bar title="修改公告" left-arrow @click-left="showinput=false"  class="bluenav"/>
      <div>
        <van-cell-group>
          <van-field v-model="activeitem.title" rows="1" autosize
            label="公告标题" type="textarea" placeholder="请输入公告标题" />
          <van-field v-model="activeitem.content" rows="3"
            autosize label="留言" type="textarea" maxlength="50" placeholder="请输入公告内容" show-word-limit />
        </van-cell-group>
        <van-button type="info" class="info-btn" block @click="updatenotice">修改</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { findnotice, updatenotice, deletenotice } from "@/api/manager";
import { formdatatime } from "@/util/base";
export default {
  data: function() {
    return {
      title1:"通知公告",
      title2:"修改公告",
      isLeftArrow:true,
      showinput: false,
      noticeList: [],
      activeitem: "",

      list: [],
      loading: false,
      finished: false,
      limit:3,
      count:0,
    };
  },
  created() {
    this.getnotices();
  },
  methods: {
    onLoad() {
      console.log("list---",this.list)
      this.count += 1;
      this.list = this.noticeList.slice(0,this.limit * this.count)
      // console.log(this.limit * this.count)
      if(this.limit * this.count > this.noticeList.length){
        // console.log("到底了")
        this.list = this.noticeList.slice(0,this.noticeList.length)
      }
      // 异步更新数据
      setTimeout(() => {
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length == this.noticeList.length) {
          this.finished = true;
        }
      }, 1000);
    },


    onClickLeft() {
      this.$router.go(-1);
    },
    async getnotices() {
      
      await findnotice().then(res => {
        if (res.code == 0) {
          this.noticeList = res.data;
          this.list = this.noticeList.slice(0,3)
        }
      });
    },
    showmodal(item) {
      this.activeitem = JSON.parse(JSON.stringify(item));
      this.showinput = true;
    },
    async updatenotice() {
      var param = {
        title: this.activeitem.title,
        content: this.activeitem.content,
        id: this.activeitem.id
      };
      await updatenotice(param).then(res => {
        if (res.code == 0) {
          this.$toast.success({
            message: "修改成功",
            dduration: 1000
          });
          setTimeout(() => {
            this.getnotices();
            this.showinput = false;
            
            this.limit = 3;
            this.count = 0;
            this.loading = true;
            this.finished = false;
            this.list = []
            this.onLoad()
          }, 1500);
        }
      });
    },
    deletnotice(item) {
      this.$dialog.confirm({
        title: "删除",
        message: "确定要删除吗？此操作仅限管理员使用。所有相关文件和相关数据将被删除。 相关统计结果和历史图表将失效。 这将影响系统的数据关系和智能判断。 重要的历史报告可能有错误。 相关功能将失效。"
      })
        .then(() => {
         this.godelete(item);
        })
        .catch(() => {
          // on cancel
        });
    },
    async godelete(item){
      await deletenotice({id:item.id}).then(res=>{
        if(res.code==0){
             this.$toast({
              message:'删除成功',
              dduration:1000
          })
          


          setTimeout(()=>{
            
            this.getnotices();
            this.limit = 3;
            this.count = 0;
            this.loading = true;
            this.finished = false;
            this.list = []
            this.onLoad()
          },800)
        }
      })
    }
  },
  filters: {
    formtime(val) {
      return formdatatime(val);
    }
  }
};
</script>
<style lang="scss">
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}
.notices {
  .van-list{
    height: calc(100vh - 130px);
    overflow-y: scroll;
    .notice {
      font-size: 0.675rem /* 14/16 */;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 5px#ccc;
      margin: 15px 10px;
    }
    // p {
    //   font-size: 16px;
    //   text-align: right;
    //   margin: 0.25rem 0rem;
    //   span {
    //     color: #ccc;
    //     margin-left: 0.1rem;
    //   }
    // }


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
      justify-content: flex-end;
      .time{
        font-size: 14px;
        color: #999;
      }
    }
  }
  
}
// .van-icon-cross {
//   position: absolute;
//   right: 0.2rem;
//   top: calc((100% - 0.4rem) / 2);
// }
.update-modal {
  position: absolute;
  background-color: #f6f6f6;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}
.van-button {
  // margin-top: 0.6rem;
}
.van-dialog{
    transform: unset;
    top: 30%;
    width: 90%;
    left: 5%;
    font-size: 0.5rem;
}
</style>