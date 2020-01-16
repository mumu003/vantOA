<template>
<!-- 员工管理 -->
  <div class="staff">
    <!-- <nav-bar :title='title' :isLeftArrow='isLeftArrow' ></nav-bar> -->
    <van-nav-bar class="oa-nav" :title="title" left-arrow right-text="添加员工" @click-left="$router.go(-1);" @click-right="baseShow = false" />
    <div v-if="baseShow">
      <van-search v-model="name" placeholder="请输入员工姓名" show-action @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
        <div class="staffItem" v-for="(item,index) in list" :key="item+index" >
          <div class="pic-name">{{item.name | name}}</div>


          <div class="right">
            <van-icon name="cross" size="0.4rem" @click.stop="deleteEmployees(item)" class="closed" />
            <div class="first-row">
              <div class="user-name">{{item.name}}</div>
              <div>
                <div class="row first">
                <!-- departColumns[index].text -->
                  <van-field v-model="item.departId" clearable label="部门 &gt;" placeholder="请选择部门" @click="departPop(item)" readonly="readonly"/>
                  <van-popup v-model="departShow" position="bottom">
                    <van-picker show-toolbar :columns="departColumns" @cancel="departShow = false"  @confirm="onSelect" />
                  </van-popup>  
                </div>
                <div class="row second">
                <!-- roleColumns[index].text -->
                  <van-field v-model="aaa" clearable label="职位 &gt;" placeholder="请选择职位" @click="rolePop(item)" readonly="readonly"/>
                  <van-popup v-model="roleShow" position="bottom">
                    <van-picker show-toolbar :columns="roleColumns" @cancel="roleShow = false"  @confirm="onSelect2" />
                  </van-popup>  
                </div>
              </div>
            </div>
            <div class="last-row">
              <div class="row last">
                <van-button class="info-btn" type="info" >奖扣分权限</van-button>
                <van-button class="info-btn" type="info" >重置密码</van-button>
              </div>
            </div>
          </div>


          
         
          <!-- <div class="row first">
            <p class="type">名称：<span>{{item.name}}</span></p>
            <van-icon name="cross" size="0.4rem" @click.stop="deleteEmployees(item)" />
          </div>
          <div class="row second">
            <p class="mark">内容：<span>{{item.remark}}</span></p>          
            <p class="point" :style="{color:item.score > 0 ? '#027AFF' : '#FF6C02'}">{{item.score > 0 ? '+'+item.score : item.score}}</p>
          </div>
          <div class="row last">
            <van-button class="info-btn" type="info"  @click="showmodal(item)">修改</van-button>
          </div> -->
        </div>
      </van-list>

    </div>
  </div>
</template>
<script>
import { findList,updateEmployeesDept,updateEmployeesRole,deleteEmployees } from "@/api/manager.js" ;
import { findAlldepart } from "@/api/depart.js" ;
export default {
  data(){
    return{
      title:"员工管理",
      isLeftArrow:true,
      baseShow:true,
      name:"",
      loading:false,
      finished:false,
      limit:3,
      count:0,
      list: [],
      staffItem: [],
      aaa:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',

      department: 0,
      position: 'a',
      depart:"",
      departId:0,
      departShow:false,   // 部门下拉框
      departColumns: [],
      role:"",
      roleId:0,
      roleShow:false,   // 角色下拉框
      roleColumns: [{
        text:"超级管理员",
        roleId:1
      },{
        text:"管理员",
        roleId:2
      },{
        text:"普通员工",
        roleId:3
      }],

      activeItem:{},
    }
  },
  mounted(){
    this.findList();
    this.findAlldepart();
  },
  filters: {
    name(val) {
      var a = val.slice(val.length - 2 , val.length);
      return a;
    }
  },
  methods:{
    onSearch(){
      
    },
    // 获取所有员工
    async findList() {
      await findList().then(res => {
        if (res.code == 0) {
          this.staffItem = res.data;
          this.list = this.staffItem.slice(0,3);
        }
      });
    },
    // 获取所有部门
    async findAlldepart(){
      await findAlldepart().then(res => {
        if(res.code == 0){
          if(res.data.length > 0){
            this.departColumns = res.data.map(item => ({
              text: item.name || "",
              id: item.id || ""
            }))
            console.log("所有部门:",this.departColumns)
          }
        }
      })
    },
    onLoad() {
      this.count += 1;
      this.list = this.staffItem.slice(0,this.limit * this.count);
      if(this.limit * this.count > this.staffItem.length){
        this.list = this.staffItem.slice(0,this.staffItem.length);
      }
      // 异步更新数据
      setTimeout(() => {
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length == this.staffItem.length) {
          this.finished = true;
        }
      }, 1000);
    },
    departPop(item){
      this.departShow = true; 
      this.setData(item);
    },
    rolePop(item){
      this.roleShow = true; 
      this.setData(item);
    },
    setData(item){
      this.activeItem.id = item.id;
      this.activeItem.departId = item.id;
      this.activeItem.name = item.name;
      this.activeItem.phone = item.phone;
      this.activeItem.roleId = item.roleId;
      this.activeItem.pwd = item.pwd;
    },
    async onSelect(value, index) {
      this.activeItem.departId = value.id;
      await updateEmployeesDept(this.activeItem).then(res => {
        console.log(res)
      })
    },
    async onSelect2(value,index){
      this.activeItem.roleId = value.roleId;
      await updateEmployeesRole(this.activeItem).then(res => {
        console.log(res)
      })
    },
    deleteStaff(item){
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
      await deleteEmployees({id:item.id}).then(res=>{
        if(res.code==0){
          this.$toast.success({
            message:'删除成功',
            duration:1000
          })
          setTimeout(()=>{
            this.findList();
            this.reset();
          },800)
        }
      })
    },
    reset(){
      this.limit = 3;
      this.count = 0;
      this.loading = true;
      this.finished = false;
      this.list = [];
      this.onLoad();
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

.staff{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  background-color: #f6f6f6;
  .oa-nav{
    background: #1989fa;
    .van-icon,
    .van-nav-bar__title,
    .van-nav-bar__text{
      color: #fff;
    }
  }
  .van-list{
    height: calc(100vh - 145px);
    overflow-y: scroll;
    .staffItem {
      font-size: 0.675rem /* 14/16 */;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 5px #ccc;
      margin: 15px 10px;
      @include flex;
      justify-content: space-between;
      .row{
        display: flex;
        align-items: center;
        margin: 10px 0;
      }
      >div{
        margin: 0 10px;
      }
      .pic-name{
        width:70px;
        height:70px;
        background:#1989fa;
        border-radius:50%;
        @include flex;
        color:#fff;
        font-size:18px;
        min-width:70px;
      }
      .right{
        position: relative;
        .first-row{
          @include flex;
          justify-content: flex-end;
          .user-name{
            width: 60%;
            font-size: 20px;
          }
        }
        .last-row{
          @include flex;
          justify-content: flex-end;
          .van-button{
            margin-right: 5px;
          }
        }
        .closed{
          position: absolute;
          top: 10px;
          right: 0;
          z-index: 10;
        }
      }


      // .user-name{
      //   font-size:16px;
      //   max-width:60px;
      // }
      // .content{
      //   width:50%;
      //   position:relative;
      //   .first,.second{
      //     @include ellipsis;
      //     -webkit-line-clamp: 1;
      //   }
      //   .last{
      //     @include flex;
      //     justify-content: flex-end;
      //     .van-button{
      //       line-height: 1rem;
      //       height: 1rem;
      //     };
      //   }
      //   .closed{
      //     position: absolute;
      //     top: 7px;
      //     right: 0;
      //     z-index: 10;
      //   }
      // }
    }
  }
}
</style>
<style lang="scss">
.first-row{
  .row{
    .van-field__label{
      width:50px;
    }
    .van-cell{
      padding:0;
      .van-field__control{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>