<template>
<!-- 员工管理 -->
  <div class="staff">
    <!-- <nav-bar :title='title' :isLeftArrow='isLeftArrow' ></nav-bar> -->
    <van-nav-bar class="oa-nav" :title="title" left-arrow right-text="添加员工" @click-left="$router.go(-1);" @click-right="baseShow = false;staffShow = true;" />
    <div v-if="baseShow">
      <van-search v-model="name" placeholder="请输入员工姓名" show-action @search="onSearch" @clear="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
        <div class="staffItem" v-for="(item,index) in list" :key="item+index" >
          <div class="pic-name">{{item.name | name}}</div>


          <div class="right">
            <van-icon name="cross" size="0.4rem" @click.stop="deleteStaff(item)" class="closed" v-if="item.roleId != 1" />
            <div class="first-row">
              <!-- <div class="user-name">{{item.name}}</div> -->
              <div>
                <van-field v-model="item.name" label="姓名 "  readonly="readonly" class="staff-cell"/> 
                <van-field v-model="item.phone" label="手机号" readonly="readonly" class="staff-cell"/> 
                <div class="row first">
                <!-- departColumns[index].text -->
                  <van-field v-model="item.departName" clearable label="部门" placeholder="请选择部门" @click="departPop(item)" readonly="readonly" is-link/>
                  <van-popup v-model="departShow" position="bottom">
                    <van-picker show-toolbar :columns="departColumns" @cancel="departShow = false"  @confirm="onSelect" />
                  </van-popup>  
                </div>
                <div class="row second">
                <!-- roleColumns[index].text -->
                  <van-field v-model="item.roleName" clearable label="角色" placeholder="请选择角色" @click="rolePop(item)" readonly="readonly" is-link/>
                  <van-popup v-model="roleShow" position="bottom">
                    <van-picker show-toolbar :columns="roleColumns" @cancel="roleShow = false"  @confirm="onSelect2" />
                  </van-popup>  
                </div>
              </div>
            </div>
            <div class="last-row">
              <div class="row last">
                <!-- <van-button class="info-btn" type="info" >奖扣分权限</van-button> -->
                <van-button class="info-btn" type="info" @click="resetPwd(item)">重置密码</van-button>
              </div>
            </div>
          </div>
        </div>
      </van-list>

    </div>

    <!-- 添加员工 -->
    <addStaff v-if="staffShow" :roleColumns="roleColumns" :departColumns="departColumns" @back="back"></addStaff>
  </div>
</template>
<script>
import { findList,updateEmployeesDept,updateEmployeesRole,deleteEmployees,resetPwd,findAllroles } from "@/api/manager.js" ;
import { findAlldepart } from "@/api/depart.js" ;
import addStaff from '@/components/manager/addStaff'
export default {
  components:{addStaff},
  data(){
    return{
      title:"员工管理",
      isLeftArrow:true,
      baseShow:true,
      staffShow:false,
      name:"",
      loading:false,
      finished:false,
      limit:3,
      count:0,
      list: [],
      staffItem: [],
      aaa:'',

      department: 0,
      position: 'a',
      depart:"",
      departId:0,
      departShow:false,   // 部门下拉框
      departColumns: [],
      role:"",
      roleId:0,
      roleShow:false,   // 角色下拉框
      roleColumns: [],
      // {
      //   text:"超级管理员",
      //   roleId:1
      // },{
      //   text:"管理员",
      //   roleId:2
      // },{
      //   text:"普通员工",
      //   roleId:3
      // }

      activeItem:{},
    }
  },
  mounted(){
    this.findList();
  },
  filters: {
    name(val) {
      var a = val.slice(val.length - 2 , val.length);
      return a;
    }
  },
  methods:{
    onSearch(){
      this.findList();
      setTimeout(() => {
        this.reset()
      },500)
    },
    // 获取所有员工
    async findList() {
      await findList({name: this.name}).then(res => {
        if (res.code == 0) {
          this.staffItem = res.data;
          this.list = this.staffItem.slice(0,3);
          this.staffItem.map(item1 => {
            this.roleColumns.forEach(item2 => {
              if(item1.roleId == item2.roleId){
                item1.roleName = item2.text;
              }
            })
          })
          this.findAlldepart();
          this.findAllroles();
        }
      });

    },
    // 获取所有部门
    async findAlldepart(){
      await findAlldepart().then(res => {
        // console.log("数据列表:",this.staffItem)
        if(res.code == 0){
          if(res.data.length > 0){
            this.departColumns = res.data.map(item => ({
              text: item.name || "",
              id: item.id || ""
            }))
            this.staffItem.map(item1 => {
              this.departColumns.forEach(item2 => {
                if(item1.departId == item2.id){
                  item1.departName = item2.text;
                }
              })
            })
          }
        }
      })
    },
    // 获取所有职位
    async findAllroles(){
      await findAllroles().then(res => {
        console.log("数据列表:",this.staffItem)
        if(res.code == 0){
          if(res.data.length > 0){
            this.roleColumns = res.data.map(item => ({
              text: item.name || "",
              roleId: item.id || ""
            }))
            this.staffItem.map(item1 => {
              this.roleColumns.forEach(item2 => {
                if(item1.roleId == item2.roleId){
                  item1.roleName = item2.text;
                }
              })
            })
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
      this.activeItem = item;
    },
    async onSelect(value, index) {
      this.activeItem.departId = value.id;
      let param={
        departId:value.id,
        id:this.activeItem.id
      }
      await updateEmployeesDept(param).then(res => {
        if(res.code == 0){
          this.$toast.success({
            message: "修改成功",
            duration: 1000
          });
          setTimeout(() => {
            this.findList();
            this.reset();
          }, 1500);
        }
      })
    },
    async onSelect2(value,index){
      this.activeItem.roleId = value.roleId;
      let param={
        id:this.activeItem.id,
        roleId:value.roleId
      }
      await updateEmployeesRole(param).then(res => {
        if(res.code == 0){
          this.$toast.success({
            message: "修改成功",
            duration: 1000
          });
          setTimeout(() => {
            this.findList();
            this.reset();
          }, 1500);
        }
      })
    },
    deleteStaff(item){
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
    // 重置密码
    async resetPwd(item){
      await resetPwd({id:item.id}).then(res => {
        if(res.code == 0){
          this.$toast.success({
            message: "重置成功",
            duration: 1000
          });
        }
      })
    },
    back(){
      this.findList();
      this.reset();
      this.staffShow = false;
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
    height: calc(100vh - 105px);
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
        width:60px;
        height:60px;
        background:#1989fa;
        border-radius:50%;
        @include flex;
        color:#fff;
        font-size:18px;
        min-width:60px;
      }
      .right{
        position: relative;
        .first-row{
          @include flex;
          justify-content: flex-end;
          .user-name{
            width: 60%;
            font-size: 18px;
          }
        }
        .last-row{
          @include flex;
          justify-content: flex-end;
          .van-button{
            line-height: 1rem;
            height: 1rem;
            &:first-child{
              margin-right: 10px;
            }
          }
        }
        .closed{
          position: absolute;
          top: 10px;
          right: 0;
          z-index: 10;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.first-row{
  .staff-cell{
    padding: 0;
    margin: 10px 0;
    .van-cell__title{
      width: 70px;
    }
  }
  .row{
    .van-field__label{
      width:70px;
    }
    .van-cell{
      padding:0;
       .van-field__body{
          width: 80%;
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
}
</style>