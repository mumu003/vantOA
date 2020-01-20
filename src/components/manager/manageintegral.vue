<template>
  <div class="manageIntergral">
    <van-nav-bar title="管理部门" left-arrow @click-left="onClickLeft"  class="bluenav"/>
    <div class="op-tip">tips：向左侧滑动 修改，向右测滑动 删除</div>
    <van-cell-group v-if="departList.length>0">
      <van-swipe-cell v-for="(item,index) in departList" :key="item.id+index">
        <template slot="left">
          <van-button square type="primary" text="修改" @click="openmodal(item)"/>
        </template>

        <van-cell :title="item.name" />

        <template slot="right">
          <van-button square type="danger" text="删除" @click="deledepart(item)"/>
        </template>
      </van-swipe-cell>
    </van-cell-group>
    <van-loading size="24px" v-else-if="loading">加载中...</van-loading>
    <van-cell v-else :value="'暂无数据'"></van-cell>
     <van-popup v-model="showinput" class="popmodal">
         <h2 class="poph2">修改部门</h2>
        <van-field v-model="activeitem.name" center clearable placeholder="请输入部门名称" >
   <van-button slot="button" size="small" type="info" @click="upadeintegral">确认</van-button>
  </van-field>
     </van-popup>
  </div>
</template>
<script>
import { findAlldepart, updatedepart, deletedepart } from "@/api/depart";
export default {
  data: function() {
    return {
      departList: [],
       activeNames: "",
      showinput:false,
      activeitem:'',
      loading:false,
    };
  },
  created() {
    this.finddepart();
  },
  methods: {
    //获取部门
    async finddepart() {
      this.loading = true;
      await findAlldepart({ name: this.value }).then(res => {
        if (res.code == 0) {
          this.departList = res.data;
        }
        this.loading = false;
      });
    },
    openmodal(item){
        this.showinput=true;
        this.activeitem=JSON.parse(JSON.stringify(item));
    },
     //修改部门
    async upadeintegral(){
          await updatedepart(this.activeitem).then(res=>{
             if(res.code==0){
                this.$toast({
              message:'修改成功',
              dduration:1000
          })
          setTimeout(()=>{
               this.finddepart();
                this.showinput = false;
          },1500)
                 
              }
          })
    },
    deledepart(item) {
     
          this.$dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
              this.godelete(item);
          });
         
    },
    async godelete(item){
        await deletedepart(item).then(res=>{
             if(res.code==0){
             this.$toast({
              message:'删除成功',
              dduration:1000
          })
          this.finddepart();

          }
        })
    },
    onClickLeft() {
     this.$emit('closemanage');
    }
  }
};
</script>
<style lang="scss" scoped>
.manageIntergral{
  position: absolute;
  background-color: #f6f6f6;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  .op-tip{
    font-size: 16px;
    padding: 10px 15px;
    color: #1989fa;

  }
  .van-cell-group{
    max-height: calc(100vh - 40px);
    overflow-y: scroll;
  }
  .van-swipe-cell__left, .van-swipe-cell__right{
    top: -8px;
  }
  .van-popup--center{
      border-radius: 0.5rem;
      width: 80%;
      left: 10%;
      top: 20%;
      padding: 1rem 0rem;
      transform: unset;
  }
  .popmodal .van-cell__value{
      border: 1px solid #ccc;
  }
  .poph2{
      font-size: 0.7rem;
      text-align: center
  }
}


</style>