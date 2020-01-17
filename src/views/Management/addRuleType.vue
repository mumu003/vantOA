<template>
  <div class="addRuleType">
    <van-nav-bar title="添加规则分类" left-arrow @click-left="$emit('back')"  class="bluenav"/>
    <van-field v-model="text" placeholder="请输入规则类别："/>
    <van-button type="info" class="info-btn" block @click="addTypes">新增</van-button>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
      <div class="typeItem" v-for="(item,index) in list" :key="item+index" >
        <div class="row first">
          <!-- <span class="type">名称：<span>{{item.name}}</span></p> -->
          <van-field v-model="item.name" label="名称：" :disabled="item.flag"/>
          <van-icon name="cross" size="0.4rem" @click.stop="deleteTypes(item)" />
        </div>
        <div class="row last">
          <van-button class="info-btn" type="info"  @click="saveTpyes(item,index)" v-show="!item.flag">保存</van-button>
          <van-button class="info-btn" type="info"  @click="editTpyes(item,index)">修改</van-button>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { updateRulesType,addRulesType,deleteRulesType } from "@/api/manager.js"
export default {
  name:"add-rule-type",
  props:{
    typeList: {
      type: Array,
      default :() => []
    }
  },
  data(){
    return{
      show:true,
      list: [],
      loading: false,
      finished: false,
      limit:3,
      count:0,
      text:"",
    }
  },
  mounted(){
  },
  // watc  
  methods:{
     onLoad() {
      this.count += 1;
      
      this.list = this.typeList.slice(0,this.limit * this.count);
      if(this.limit * this.count > this.typeList.length){
        this.list = this.typeList.slice(0,this.typeList.length);
      }
      // 异步更新数据
      setTimeout(() => {
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length == this.typeList.length) {
          this.finished = true;
        }
      }, 1000);
    },
    async addTypes(){
      await addRulesType({name: this.text}).then(res => {
        if(res.code == 0){
          this.$toast.success({
            message: "添加成功",
            duration: 1000
          });
          this.$emit("reload");
          setTimeout(() => {
            this.limit = 3;
            this.count = 0;
            this.loading = true;
            this.finished = false;
            this.list = []
            this.onLoad()
          },1500)  
        }
      })
    },
    deleteTypes(item){
      this.$dialog.confirm({
        title: "删除",
        message: "确定要删除吗？"
      }).then(() => {
         this.goDelete(item);
      }).catch(() => {
          // on cancel
      });
       
    },
    async goDelete(item){
      await deleteRulesType({id:item.id}).then(res => {
        if(res.code == 0){
          this.$toast.success({
            message:'删除成功',
            duration:1000
          })
          this.$emit("reload");
          setTimeout(() => {
            this.limit = 3;
            this.count = 0;
            this.loading = true;
            this.finished = false;
            this.list = [];
            this.onLoad();
          },1500)   
        }
      })
    },
    editTpyes(item,index){
      // item.flag = false;
      this.$set(this.typeList[index],"flag",false);
    },
    async saveTpyes(item,index){
      await updateRulesType({id: item.id,name: item.name}).then(res => {
        if (res.code == 0) {
          this.$toast.success({
            message:'修改成功',
            duration:1000
          })
          this.$set(this.typeList[index],"flag",true);
        }
      })
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
@mixin flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
  .addRuleType{
    position: absolute;
    background-color: #f6f6f6;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
      .van-list{
        height: calc(100vh - 135px);
        overflow-y: scroll;
        .typeItem {
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
            margin: 0 8px;
          }
        }
      }
  }
</style>