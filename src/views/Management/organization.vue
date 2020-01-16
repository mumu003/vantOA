<template>
  <div class="page main-cnt">
    <div v-if="!manageintegral">
      <div>
        <nav-bar :title='barTitle' :isLeftArrow='isLeftArrow' ></nav-bar>
        <!-- <van-nav-bar title="组织架构" left-text="返回" left-arrow @click-left="onClickLeft" class="bluenav" /> -->
        <van-search v-model="value" placeholder="请输入部门名称" show-action  @search="onSearch" >
          <div slot="action" @click="onSearch">搜索</div> 
        </van-search>
        <div class="topmain">
          <div @click="openmodal">
            <van-icon name="add-o" />
            <div>添加部门</div>
          </div>
          <div @click="tomanage">
            <van-icon name="setting" />
            <div>管理部门</div>
          </div>
        </div>
        <div class="main organizationList">
          <van-collapse v-model="activeNames" accordion @change="findAllemList" v-if="departlist.length>0" >
            <van-collapse-item :title="item.name" :name="item.id" v-for="(item,index) in departlist" :key="item.id+index" >
              <van-cell-group v-if="showlist.length>0">
                <van-cell :title="'姓名:'+ citem.name" :value="'电话:'+ citem.phone" v-for="(citem,cindex) in showlist" :key="citem.id+cindex" />
              </van-cell-group>
              <van-loading size="24px" v-else-if="loading">加载中...</van-loading>
              <van-cell v-else :value="'暂无数据'"></van-cell>
              <!-- 如果没数据 -->
              <!-- <van-cell v-else :value="'暂无数据'"></van-cell> -->
            </van-collapse-item>
          </van-collapse>
          <van-cell v-else :value="'暂无数据'"></van-cell>
        </div>
      </div>
      <!-- <van-popup v-model="showinput" class="popmodal">
        <van-field v-model="activeitem.name" center clearable placeholder="请输入部门名称">
          <van-button slot="button" size="small" type="info" @click="addintegral">确认</van-button>
        </van-field>
      </van-popup> -->
      <van-dialog v-model="showinput" title="添加部门" show-cancel-button @confirm="addintegral">
        <van-field v-model="activeitem.name" center clearable placeholder="请输入部门名称">
          <!-- <van-button slot="button" size="small" type="info" @click="addintegral">确认</van-button> -->
        </van-field>
      </van-dialog>
    </div>
    <!-- <div class="modal" v-if="showinput">
      <van-nav-bar :title="activeitem.id?'修改部门':'添加部门'" left-arrow @click-left="showinput=false"  class="bluenav"/>
      <div>
        <van-cell-group class="inputmodal">
          <van-field
            v-model="activeitem.name"
            rows="1"
            autosize
            label="部门名称"
            type="textarea"
            placeholder="请输入部门名称"
          />
          
        </van-cell-group>
         <van-button class="bottombtn" type="primary" block @click="upadeintegral"  v-if="activeitem.id">修改</van-button>
        <van-button class="bottombtn" type="primary" block @click="addintegral" v-else >添加</van-button>
       
      </div>
    </div>-->
    <manageIntegral v-if="manageintegral" v-on:closemanage="manageintegral=false"></manageIntegral>
  </div>
</template>
<script>
import {
  findAlldepart,
  findAllList,
  adddepart,
  updatedepart,
  deletedepart
} from "@/api/depart";
import manageIntegral from "@/components/manager/manageintegral.vue";
export default {
  components: {
    manageIntegral
  },
  data: function() {
    return {
      barTitle:"组织架构",
      isLeftArrow:true,
      value: "",
      departlist: [],
      activeNames: "",
      showinput: false,
      title: "",
      manageintegral: false,
      activeitem: "",
      showlist: [],   //折叠面板展开图
      loading:false,
    };
  },
  created() {
    this.finddepart();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //获取部门
    async finddepart() {
      this.loading = true;
      await findAlldepart({ name: this.value }).then(res => {
        if (res.code == 0) {
          this.departlist = res.data;
        }
        this.loading = false;
      });
    },
    deledepart(item) {
      this.$dialog
        .confirm({
          message: "确定删除吗？"
        })
        .then(() => {
          this.godelete(item);
        });
    },
    async godelete(item) {
      await deletedepart(item).then(res => {
        if (res.code == 0) {
          this.$toast.success({
            message: "删除成功",
            dduration: 1000
          });
          this.finddepart();
        }
      });
    },
    openmodal(item) {
      this.showinput = true;
      if (item) {
        this.activeitem = item;
      } else {
        this.activeitem = {};
      }
    },
    tomanage() {
      this.manageintegral = true;

      // this.$router.push({name:'manageintegral'})
    },
    //添加部门
    async addintegral() {
      await adddepart(this.activeitem).then(res => {
        if (res.code == 0) {
          this.$toast({
            message: "添加成功",
            dduration: 1000
          });

          this.finddepart();
          this.showinput = false;
        }
      });
    },

    onSearch() {
      this.finddepart();
    },
    //获取部门下员工
    async findAllemList(value) {
      if (!value) {
        return;
      }
      this.loading = true;
      var param = {
        departId: value
      };
      await findAllList(param).then(res => {
        if (res.code == 0) {
          this.loading = false;
          this.showlist = res.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  background-color: #f6f6f6;
  min-height: 100%;
  width: 100%;
  position: absolute;
}
.topmain {
  padding: 15px;
  display: flex;
  background-color: white;
  justify-content: space-around;
  font-size: 0.45rem;
  .van-icon {
    font-size: 30px;
    padding: 10px;
    background-color: rgb(25, 137, 250);
    color: white;
    border-radius: 50%;
    margin-bottom: 10px;
  }
}
.main {
  margin-top: 10px;
  height: calc(100vh - 265px);
  overflow-y: scroll;
}

.van-popup--center {
  width: 80%;
  padding: 10px 0;
  // left: 10%;
  // top: 20%;
  // padding: 1rem 0rem;
  // transform: unset;
}
.popmodal .van-cell__value {
  border: 1px solid #ccc;
}

.poph2 {
  font-size: 0.7rem;
  text-align: center;
}
</style>