<template>
<!-- 积分规则 -->
  <div class="pointRule main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow' ></nav-bar>
    <div v-if="!showinput">
      <van-search v-model="name" placeholder="请输入规则名称" show-action shape="round" @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-field v-model="type" clearable label="选择分类 &gt;" placeholder="请选择分类" @click="typeShow = true" readonly="readonly"/>
      <van-popup v-model="typeShow" position="bottom">
        <van-picker show-toolbar :columns="typeColumns" @cancel="typeShow = false"  @confirm="onSelect" />
      </van-popup>  
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
        <div class="ruleList" v-for="(item,index) in list" :key="item+index" >
          <div class="row first">
            <p class="type">名称：<span>{{item.name}}</span></p>
            <van-icon name="cross" size="0.4rem" @click.stop="deletnotice(item)" />
          </div>
          <div class="row second">
            <p class="mark">内容：<span>{{item.remark}}</span></p>          
            <p class="point" :style="{color:item.score > 0 ? '#027AFF' : '#FF6C02'}">{{item.score > 0 ? '+'+item.score : item.score}}</p>
          </div>
          <div class="row last">
            <van-button class="info-btn" type="info"  @click="showmodal(item)">修改</van-button>
          </div>
        </div>
      </van-list>
    </div>

    <!-- 添加 / 修改 -->
    <div class="update-modal" v-if="showinput">
      <van-nav-bar :title="title2" left-arrow @click-left="showinput=false"  class="bluenav"/>
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
import { findByName,findAll,findByType } from "@/api/manager.js" ;
export default {
  data(){
    return{
      title:"积分规则",
      title2:"",
      isLeftArrow:true,
      name:"",
      type:"所有分类",
      typeId:0,
      typeShow:false,
      typeColumns: [],
      
      list: [],
      ruleList: [],
      loading: false,
      finished: false,
      limit:3,
      count:0,
      showinput:false,
    }
  },
  mounted(){
    this.findName();
  },
  methods:{
    // 根据规则名称查询列表
    async findName(){
      await findByName({ name: this.name }).then(res => {
         if (res.code == 0) {
          //  console.log(res)
          this.ruleList = res.data;
          this.list = this.ruleList.slice(0,3);
        }
      })
      // 获取规则分类
      await findAll().then(res => {
        // console.log(res)
        res.data.map(item => {
          item['text'] = item.name
        })
        this.typeColumns = res.data;
      })
    },
    // 根据规则类别查询列表
    async findByType(){
      await findByType({ ruleType: this.typeId }).then(res => {
        if (res.code == 0) {
          // console.log(res)
          this.ruleList = res.data;
          this.limit = 3;
          this.count = 0;
          this.loading = true;
          this.finished = false;
          this.list = [];
          this.onLoad()
        }
      })
    },
    onSearch(){
      this.findName();
    },
    onSelect(value, index) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.typeShow = false;
      this.type = value.name;
      this.typeId = value.id;
      this.findByType();
      this.name = "";
    },
     onLoad() {
      this.count += 1;
      this.list = this.ruleList.slice(0,this.limit * this.count);
      if(this.limit * this.count > this.ruleList.length){
        this.list = this.ruleList.slice(0,this.ruleList.length);
      }
      // 异步更新数据
      setTimeout(() => {
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length == this.ruleList.length) {
          this.finished = true;
        }
      }, 1000);
    },
    // 修改规则
    showmodal(item){
      this.activeitem = JSON.parse(JSON.stringify(item));
      this.showinput = true;
      if(item.id){
        this.title2 = "修改规则"
      }else{
        this.title2 = "新增规则"
      }
    },
    deletnotice(item) {
      this.$dialog.confirm({
        title: "删除",
        message: "确定要删除吗？此操作仅限管理员使用。所有相关文件和相关数据将被删除。 相关统计结果和历史图表将失效。 这将影响系统的数据关系和智能判断。 重要的历史报告可能有错误。 相关功能将失效。"
      }).then(() => {
         this.godelete(item);
      }).catch(() => {
          // on cancel
      });
    },
  }
}
</script>
<style lang="scss" scoped>
@mixin ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.pointRule{
  .van-list{
    height: calc(100vh - 190px);
    overflow-y: scroll;
    .ruleList {
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
        margin: 0.25rem 0rem;
        @include ellipsis;
      }
    }
    .first{
      justify-content: space-between;
      p{
        width: 80%;
        -webkit-line-clamp: 1;
      }
    }
    .second{
      justify-content: space-between;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .mark{
        width: 75%;
      }
      .point{
        font-size: 24px;
        color: #027AFF;
      }
    }
    .last{
      justify-content: flex-end;
      padding: 0.25rem 0rem;
      .van-button{
        line-height: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>