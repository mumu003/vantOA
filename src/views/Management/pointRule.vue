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
            <van-icon name="cross" size="0.4rem" @click.stop="deleteRules(item)" />
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
        <van-field v-model="activeItem.text" clearable label="选择分类 &gt;" required placeholder="请选择分类" @click="typeShow = true" readonly="readonly"/>
        <van-popup v-model="typeShow" position="bottom">
          <van-picker show-toolbar :columns="typeColumns" @cancel="typeShow = false"  @confirm="onSelect2" />
        </van-popup> 
        <van-field label="积分" readonly required clickable v-model="activeItem.score" @touchstart.native.stop="scoreShow = true"  placeholder="请输入积分(负数代表扣分)"/>
        <van-number-keyboard v-model="activeItem.score" :show="scoreShow" :maxlength="3" @blur="scoreShow = false" safe-area-inset-bottom  extra-key="-"/>
        
        <van-cell-group> 
          <van-field v-model="activeItem.name" required clearable label="名称"
            placeholder="请输入积分规则名称" @click-right-icon="$toast('question')" />
          <van-field v-model="activeItem.remark" rows="3"  autosize label="内容" type="textarea" placeholder="请输入内容" />
        </van-cell-group>
        <van-button type="info" class="info-btn" block @click="updateRule">提交</van-button>
      </div>
    </div>

  </div>
</template>
<script>
import { findByName,findAll,findByType,updateRules,deleteRules } from "@/api/manager.js" ;
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

      // 修改
      activeItem:"",
      rulesType:0,
      score:"",
      scoreShow:false,
      ruleContent:"",
      ruleRemark:""
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
      this.activeItem = JSON.parse(JSON.stringify(item));
      this.activeItem.score = this.activeItem.score.toString();
      var a =this.typeColumns.filter(item => {
        return item["id"] == this.activeItem.rulesType
      })
      this.activeItem.text = a[0].text;
      this.activeItem.rulesType = a[0].id;
      this.showinput = true;
      if(this.activeItem.id){
        this.title2 = "修改规则";
        this.type2 = "";
        this.typeId2 = "";
      }else{
        this.title2 = "新增规则";
      }
    },
    // 表单校验
    updateRule() {
      if(!this.activeItem.name){
        this.$toast("请输入规则名称");
        return;
      }else if(!(this.activeItem.score<0)){
        // 分数大于0
        if(this.activeItem.score.indexOf("-") != -1){
          this.$toast("请输入正确格式的积分");
          return;
        }else if(this.activeItem.score > 100){
          this.$toast("请输入100分以内的积分");
          return;
        }else{
          this.submit();
        }
      }else{
        this.submit();
      }
    },
    // 提交
    async submit(){
      var param = {
        rulesType: this.activeItem.rulesType,
        remark: this.activeItem.remark,
        name: this.activeItem.name,
        score: this.activeItem.score,
        id: this.activeItem.id
      };
      await updateRules(param).then(res => {
        if (res.code == 0) {
          // console.log(res)
          this.$toast.success({
            message: "修改成功",
            duration: 1000
          });
          setTimeout(() => {
            this.findName();
            this.showinput = false;
            this.type = "所有分类"
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
    onSelect2(value, index){
      this.typeShow = false;
      this.activeItem.text = value.name;
      this.activeItem.rulesType = value.id;
    },
    deleteRules(item) {
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
      await deleteRules({id:item.id}).then(res=>{
        if(res.code==0){
             this.$toast({
              message:'删除成功',
              duration:1000
          })
          setTimeout(()=>{
            
            this.findName();
            this.limit = 3;
            this.count = 0;
            this.loading = true;
            this.finished = false;
            this.list = []
            this.onLoad()
          },800)
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
.pointRule{
  background-color: #f6f6f6;
  .van-list{
    height: calc(100vh - 145px);
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