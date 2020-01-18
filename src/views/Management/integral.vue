<template>
  <div class="page main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow' ></nav-bar>
    <!-- <van-nav-bar title="积分申请" left-text="返回" left-arrow @click-left="onClickLeft" class="bluenav" /> -->
    <div class="form">
      <van-cell-group>
        <van-field  v-model="param.content" rows="3" autosize type="textarea"
          maxlength="50" placeholder="申请理由" show-word-limit />
        <div class="approverselect">
          <label for>审批人</label>
          <van-dropdown-menu>
            <van-dropdown-item v-model="param.approver" :options="auDtors" />
          </van-dropdown-menu>
        </div>
        <div class="moreinput">
          <van-field v-model="param.certifier" size="small" placeholder="证明人" required />
          <span class="span">分值:</span>
          <van-field v-model="param.add" size="small" type="number" min="0" placeholder="输入分值" required />
        </div>
        <van-switch-cell v-model="checked" title="指定积分规则" active-color="#1989fa" />
        <div class="select" v-if="checked">
          <label for>选择规则类别</label>
          <van-dropdown-menu>
            <van-dropdown-item v-model="param.employeesId" :options="categoryList" @change="getrule" />
          </van-dropdown-menu>
        </div>
        <div class="select" v-if="checked">
          <label for>选择积分规则</label>
          <van-dropdown-menu>
            <van-dropdown-item v-model="param.rulesId" :options="ruleList" />
          </van-dropdown-menu>
        </div>
      </van-cell-group>
    </div>
    <van-button type="info" class="info-btn" block  @click="applyempl">立即申请</van-button>
  </div>
</template>
<script>
import { getruletype, getrule, applyempl, findautior } from "@/api/integral";
export default {
  data: function() {
    return {
      title:"积分申请",  
      isLeftArrow:true,
      param: {
        add: "",
        approver: "",
        certifier: "",
        content: "",
        employeesId: "",
        rulesId: ""
      },
      checked: false,
      categoryList: [],
      ruleList: [],
      auDtors: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getcategory();
      this.findautior();
      this.checked = false;
      this.param = {
        add: "",
        approver: "",
        certifier: "",
        content: "",
        employeesId: "",
        rulesId: ""
      };
    },
    //获取规则类别
    async getcategory() {
      await getruletype().then(res => {
        if (res.code == 0) {
          this.categoryList = res.data;
          if (this.categoryList.length > 0) {
            this.categoryList.forEach(v => {
              v.value = v.id;
              v.text = v.name;
            });
            this.param.employeesId = this.categoryList[0].id;
            this.getrule();
          } else {
            this.categoryList.push({ text: "无", value: "" });
            this.param.employeesId = this.categoryList[0].value;
          }
        }
      });
    },
    //获取积分规则
    async getrule() {
      var param = {
        ruleType: this.param.employeesId
      };
      await getrule(param).then(res => {
        if (res.code == 0) {
          this.ruleList = res.data;
          if (this.ruleList.length > 0) {
            this.ruleList.forEach(v => {
              v.value = v.id;
              v.text = v.name;
            });
            this.param.rulesId = this.ruleList[0].id;
          } else {
            this.ruleList.push({ text: "无", value: "" });
            this.param.rulesId = this.ruleList[0].value;
          }
        }
      });
    },
    //获取审核人
    async findautior() {
      var userinfo = this.$store.state.userinfo;
      var param = {
        eId: userinfo.id,
        roleid: userinfo.roleId
      };
      await findautior(param).then(res => {
        if (res.code == 0) {
          this.auDtors = res.data;
          if (this.auDtors.length > 0) {
            this.auDtors.forEach(v => {
              v.value = v.id;
              v.text = v.name;
            });
            this.param.approver = this.auDtors[0].id;
          } else {
            this.auDtors.push({ text: "无", value: "" });
            this.param.approver = this.auDtors[0].value;
          }
        }
      });
    },
    //积分申请
    async applyempl() {
      if (this.param.certifier == "") {
        this.$toast("证明人不能为空!");
        return;
      } 
      // else if (this.param.add == "") {
      //   this.$toast("分数不能为空!");
      //   return;
      // }
      else if(!this.param.add){
        this.$toast("请输入正确格式的积分");
      }else{
        delete this.param.employeesId;
        if (!this.checked) {
          this.param.rulesId = "";
        }
        this.param.creator = this.$store.state.userinfo.creator;

        await applyempl(this.param).then(res => {
          if (res.code == 0) {
            this.$toast.success("申请成功");
            setTimeout(() => {
              this.$router.push({
                path:'/approval',
              })
            },800)
          }
          this.init();
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  position: absolute;
  background-color: #f6f6f6;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.van-cell-group {
  padding:10px 0;
  // padding-bottom: 1rem;
}
.van-field {
  border: 1px solid #ccc;
  width: calc(100% - 0.4rem);
  margin-left: 0.2rem;
  border-radius: 3px;
  // margin-top: 0.2rem;
}
.moreinput {
  display: flex;
  font-size: 0.5rem;
  .span {
    margin-left: 0.5rem;
    line-height: 45px;
  }
  .van-field {
    width: 40%;
  }
}
.van-switch-cell {
  margin-top: 0.2rem;
  border: none;
  font-size: 0.5rem;
}
.select {
  width: calc(100% - 1rem);
  margin-left: 0.5rem;

  font-size: 0.5rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  .van-dropdown-menu {
    border-radius: 4px;
    border: 1px solid #ccc;
    height: 1.2rem;
    line-height: 1.2rem;
  }
}

.bottombtn {
  // position: absolute;
  // bottom: 2rem;
  background-color: #1989fa;
}
.approverselect {
  font-size: 0.5rem;
  display: flex;
  width: calc(100% - 0.4rem);
  margin: 0.3rem auto;
  // margin-bottom: 0rem;
  justify-content: space-between;
  border: 1px solid #ccc;
  height: 1.4rem;
  line-height: 1.4rem;
  label {
    width: 30%;
    margin-left: 0.2rem;
  }
  .van-dropdown-menu {
    height: 100%;
    flex: 0.5;
    text-align: right;
  }
}
</style>