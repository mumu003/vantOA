<template>
<!-- 添加员工 -->
  <div class="addStaff">
    <van-nav-bar title="添加员工" left-arrow @click-left="$emit('back')"  class="bluenav"/>
    <van-field v-model="departName" clearable label="选择部门" placeholder="请选择部门" @click="departPop" readonly="readonly" required is-link/>
    <van-popup v-model="departShow" position="bottom">
      <van-picker show-toolbar :columns="departColumns" @cancel="departShow = false"  @confirm="onSelect" />
    </van-popup>  
    <van-field v-model="roleName" clearable label="选择职位" placeholder="请选择职位" @click="rolePop" readonly="readonly" required is-link/>
    <van-popup v-model="roleShow" position="bottom">
      <van-picker show-toolbar :columns="roleColumns" @cancel="roleShow = false"  @confirm="onSelect2" />
    </van-popup>  
    <van-field v-model="name" label="姓名：" required="required" maxlength="10"/>
    <van-field v-model="phone" label="手机号：" type="tel" required="required"/>
    <van-button class="info-btn" type="info" block @click="saveStaff">保存</van-button>
  </div>
</template>
<script>
import { addEmployees } from "@/api/manager"
export default {
  name:"addStaff",
  props:{
    roleColumns: {
      type: Array,
      default :() => []
    },
    departColumns: {
      type: Array,
      default :() => []
    },
  },
  data(){
    return{
      departName:"",
      departId:"",
      departShow:false,
      roleName:"",
      roleId:"",
      roleShow:false,
      name:"",
      phone:"",
    }
  },
  methods:{
    departPop(){
      this.departShow = true;
    },
    rolePop(){
      this.roleShow = true;
    },
    onSelect(val,index){
      this.departId = val.id;
      this.departName = val.text;
      this.departShow = false;
    },
    onSelect2(val,index){
      this.roleId = val.roleId;
      this.roleName = val.text;
      this.roleShow = false;
    },
    saveStaff(){
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if(this.roleName == ''){
        this.$toast("请选择职位");
      }else if(this.departName == ''){
        this.$toast("请选择部门");
      }else if(this.name == ''){
        this.$toast("姓名不能为空");
        return;
      }else if (this.phone == '') {
        this.$toast("手机号不能为空");
        return;
      } else if (!reg.test(this.phone)) {
        this.$toast("手机号格式不正确");
        return;
      }
      else{
        this.addEmployees();
      }
    },
    async addEmployees(){
      let params = {
        departId: this.departId,
        name: this.name,
        phone: this.phone,
        roleId: this.roleId
      }
      await addEmployees(params).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$toast.success({
            message: "添加成功",
            duration: 1000
          });
          setTimeout(() => {
            this.$emit("back");
          }, 1500);
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.addStaff{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  top: 0;
}
</style>
<style lang="scss">
.addStaff{
  .oa-nav{
    position: relative;
    height: 1.4375rem;
    line-height: 1.4375rem;
    text-align: center;
    background-color: #fff;
    .van-icon,
    .van-nav-bar__title,
    .van-nav-bar__text{
      color: #323233 !important;
    }
  }
}
</style>