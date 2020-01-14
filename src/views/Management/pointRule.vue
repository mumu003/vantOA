<template>
<!-- 积分规则 -->
  <div class="pointRule main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow' ></nav-bar>
    <div v-if="baseShow">
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
      <!-- 右下角新增按钮 -->
      <div class="bigest">
        <div class="content">
          <div class="more-show" style="position: absolute;bottom: 0;width: 100%;">
            <div class="add-rule more-row">
              <span>添加规则</span>
              <div @click="showmodal()">
                <img :src="`/static/img/manage/addRule.png`" alt="">
              </div>
            </div>
            <div class="add-type more-row">
              <span>添加分类</span>
              <div @click="addRuleType">
                <img :src="`/static/img/manage/addRuleType.png`" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="more-icon">
          <div>
            <img class="init" :src="`/static/img/manage/add.png`" alt="" @click="more">
          </div>
        </div>
      </div>
    </div>

    <!-- 添加 / 修改规则 -->
    <div class="update-modal" v-if="showinput">
      <van-nav-bar :title="title2" left-arrow @click-left="showinput = false;baseShow = true;maskShow = false;"  class="bluenav"/>
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

    <!-- 添加 / 修改规则类型 -->
    <addRuleType :typeList='typeColumns' v-if="typeEdit" @reload="findName" @back="back"></addRuleType>

    <!-- 遮罩 -->
    <div class="mask" v-if="maskShow"></div>

  </div>
</template>
<script>
import { findByName,findAll,findByType,updateRules,deleteRules,addRules } from "@/api/manager.js" ;
import addRuleType from "./addRuleType";
export default {
  components:{addRuleType},
  data(){
    return{
      title:"积分规则",
      title2:"",
      isLeftArrow:true,
      name:"",
      type:"所有分类",
      typeId:0,
      typeShow:false,   // 分类下拉框
      typeColumns: [],
      list: [],
      ruleList: [],
      loading: false,
      finished: false,
      limit:3,
      count:0,
      baseShow:true,    // 主容器
      showinput:false,  // 修改规则

      // 修改
      activeItem:"",
      rulesType:0,
      score:"",
      scoreShow:false,  // 数字键盘
      ruleContent:"",
      ruleRemark:"",

      // 展开更多
      maskShow:false,   // 遮罩
      typeEdit:false,   // 添加规则类型
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
          item['text'] = item.name;
          item['flag'] = true;
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
          this.list = this.ruleList.slice(0,3);
          this.reset();
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
      this.showinput = true;
      this.baseShow = false;
      if(item){
        this.activeItem = JSON.parse(JSON.stringify(item));
        this.activeItem.score = this.activeItem.score.toString();
        var a =this.typeColumns.filter(item => {
          return item["id"] == this.activeItem.rulesType;
        })
        this.activeItem.text = a[0].text;
        this.activeItem.rulesType = a[0].id;
        

        this.title2 = "修改规则";
        this.type2 = "";
        this.typeId2 = "";
      }else{
        this.title2 = "新增规则";
        this.activeItem = {};
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
      // console.log(param.id)
      if(this.activeItem.id){
        // 编辑
        param.id = this.activeItem.id;
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
              this.maskShow = false;
              this.baseShow = true;
              this.type = "所有分类"
              this.reset();
            }, 1500);
          }
        });
      }else{
        // 新增
        await addRules(param).then(res => {
          if (res.code == 0) {
            // console.log(res)
            this.$toast.success({
              message: "新增成功",
              duration: 1000
            });
            setTimeout(() => {
              this.findName();
              this.showinput = false;
              this.maskShow = false;
              this.baseShow = true;
              this.type = "所有分类"
              this.reset();
            }, 1500);
          }
        });
      }
      
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
          this.$toast.success({
            message:'删除成功',
            duration:1000
          })
          setTimeout(()=>{
            
            this.findName();
            this.reset();
          },800)
        }
      })
    },
    // 展开更多
    more(){
      this.maskShow = !this.maskShow;
      if (this.maskShow){
        this.typeEdit=false;
        $(".content").css("height","3.75rem");
        $(".bigest").css("width","100%");
        $(".more-show").stop(true,true).animate({'height':'100%'});
        $(".init").removeClass("init").addClass("rotate-after");
      }else{
        this.hide();
      }
    },
    hide(){
      $(".more-show").stop(true,true).animate({height:"0px"});
      $(".rotate-after").removeClass("rotate-after").addClass("init");
      setTimeout(() => {
        $(".content").css("height","0px");
        $(".bigest").css("width","unset");
      }, 300);
    },
    // 处理从规则类别新增页返回的情况
    back(){
      this.reset();
      this.typeEdit = false;
      this.baseShow = true;
    },
    reset(){
      this.limit = 3;
      this.count = 0;
      this.loading = true;
      this.finished = false;
      this.list = [];
      this.onLoad();
    },
    // 添加规则
    addRule(){

    },
    // 添加规则分类
    addRuleType(){
      this.maskShow = false;
      this.typeEdit = true;
      this.baseShow = false;
      this.hide();
    }
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
@mixin more-icon{
  width: 45px;
  height: 45px;
  background-color: #1989fa;
  border-radius: 50%;
 box-shadow:0 0.2375rem 0.2rem 0 rgba(2,122,255,0.29);
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
  .bigest{
    position: absolute;
    bottom: 80px;
    // padding-bottom: 40px;
    right: 40px;
      .content{
        position: relative;
        height:0;
        .more-show{
          position: absolute;
          display: block;
          bottom: 0;
          height: 0;
          width: 100%;
          overflow: hidden;
          z-index: 2;
          .more-row{
            @include flex;
            justify-content: flex-end;
            margin: 10px 0;
            span{
              font-size: 13px;
              color: #999;
              padding-right: 10px;
            }
            div{
              @include more-icon;
              @include flex;
              img{
                width: 50%;
              }
            }
          }
        }
      }
      .more-icon{
        @include flex;
        z-index: 5;
        position: relative;
        justify-content: flex-end;
        >div{
          @include more-icon;
          @include flex;
          img{
            width: 50%;
          }
          .init{
            transform: rotate(0);
            transition:all .3s linear;
          }
        }
      }
    } 
    .rotate-after{
      transform: rotate(45deg);
      transition:all .3s linear;
    }
}
</style>