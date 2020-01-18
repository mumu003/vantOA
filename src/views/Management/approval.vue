<template>
  <div class="view-approval main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
   
    <van-tabs v-model="activeTab" color="#1989fa">
      <van-tab title="待审批">
        <van-loading size="24px" v-show="loading">加载中...</van-loading>
        <div class="no-data" v-if="loadFinished[0]">暂无数据</div>
          <!-- 普通管理员、员工 -->
          <div :class="{'appli-list':true, 'main-box':true}" v-else>
            <div class="wait-item" v-for="(item1,index1) in waitList" :key="index1">
              <div class="appli-item">
                <div class="appli-head ">
                  <span class="name">{{item1.name}}的积分申请</span>
                </div>
                <div class="appli-cnt">
                  <span class="appli-cnt-title ">规则：</span>
                  <span class="appli-cnt-info">{{item1.rname}}</span>
                </div>
                <div class="appli-cnt">
                  <span class="appli-cnt-title">申请理由：</span>
                  <span class="appli-cnt-info">{{item1.content}}</span>
                </div>
                <div class="appli-cnt">
                  <span class="appli-cnt-title">申请积分：</span>
                  <span class="appli-cnt-info">{{item1.score>0 ? `+${item1.score}`:item1.score}}分</span>
                </div>
                <div class="appli-footer">
                  <span class="time">{{item1.applyTime}}</span>
                  <div class="state">
                    <span class="delete" @click="deletePoint(item1.id)">删除</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </van-tab>
      <van-tab title="已通过">
        <van-loading size="24px" v-show="loading">加载中...</van-loading>
        <div class="no-data" v-if="loadFinished[1]">暂无数据</div>
        <div class="appli-list accept" v-else>
          <div class="appli-item" v-for="(item2,index2) in passList" :key="index2">
            <div class="appli-head ">
              <span class="name">{{item2.name}}的积分申请</span>
            </div>
            <div class="appli-cnt">
              <span class="appli-cnt-title ">规则：</span>
              <span class="appli-cnt-info">{{item2.rname}}</span>
            </div>
            <div class="appli-cnt">
              <span class="appli-cnt-title">申请理由：</span>
              <span class="appli-cnt-info">{{item2.content}}</span>
            </div>
            <div class="appli-cnt">
              <span class="appli-cnt-title">申请积分：</span>
              <span class="appli-cnt-info">{{item2.score>0?`+${item2.score}`:item2.score}}分</span>
            </div>
            <div class="appli-footer">
              <span class="time">{{item2.applyTime}}</span>
              <div class="state">
                <span class="passed">已通过</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="未通过">
        <van-loading size="24px" v-show="loading">加载中...</van-loading>
        <div class="no-data" v-if="loadFinished[2]">暂无数据</div>
          <div class="appli-list unaccept">
            <div class="appli-item" v-for="(item3,index3) in disagreeList" :key="index3">
              <div class="appli-head ">
                <span class="name">{{item3.name}}的积分申请</span>
              </div>
              <div class="appli-cnt">
                <span class="appli-cnt-title ">规则：</span>
                <span class="appli-cnt-info">{{item3.rname}}</span>
              </div>
              <div class="appli-cnt">
                <span class="appli-cnt-title">申请理由：</span>
                <span class="appli-cnt-info">{{item3.content}}</span>
              </div>
              <div class="appli-cnt">
                <span class="appli-cnt-title">申请积分：</span>
                <span class="appli-cnt-info">{{item3.score>0?`+${item3.score}`:item3.score}}分</span>
              </div>
              <div class="appli-footer">
                <span class="time">{{item3.applyTime}}</span>
                <div class="state">
                  <span class="rejected">已拒绝</span>
                </div>
              </div>
            </div>
          </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import {
    findPointWaitByEmpl,
    findPointPassByEmpl,
    findPointDisagreeByEmpl,
    deletePoint
  } from "@/api/integral";
  export default {
    name: "Approval",
    data() {
      return {
        title: '积分审批',
        isLeftArrow: true,
        activeTab: 0,
        waitList: [], 
        passList: [], 
        disagreeList:[],
        loadFinished: [false, false, false],
        loading: false
      }
    },
    mounted() {
      let userInfo = this.$store.state.userinfo
      this.roleId = userInfo.roleId
      this.getList()
    },
    methods: {
      // 获取审批列表
      async getList() {
        this.loading = true
        // 待审批
        await findPointWaitByEmpl().then(res => {
          if (res.code == 0) {
            setTimeout(() => {
              this.loading = false
              if (res.data.length == 0) {
                this.loadFinished[0] = true
              } else {
                this.loadFinished[0] = false
                this.waitList = res.data
              }
            })
          }
        })
        // 已通过
        await findPointPassByEmpl().then(res => {
          if (res.code == 0) {
            setTimeout(() => {
              this.loading = false
              if (res.data.length == 0) {
                this.loadFinished[1] = true
              } else {
                this.loadFinished[1] = false
                this.passList = res.data
              }
            })
          }
        })
        // 未通过
        await findPointDisagreeByEmpl().then(res => {
          if (res.code == 0) {
            setTimeout(() => {
              this.loading = false
              if (res.data.length == 0) {
                this.loadFinished[2] = true
              } else {
                this.loadFinished[2] = false
                this.disagreeList = res.data
              }
            })
          }
        })
      },
      async delete(id) {
        let data={
            id
        }
        await deletePoint(data).then(res => {
          if (res.code == 0) {
            this.$toast("删除成功!")
          } else {
            this.$toast(res.msg)
          }
        })
      },
      // 删除审批申请
      deletePoint(id,index) {
        this.$dialog.confirm({
          message: '确定删除该条申请？'
        }).then(() => {
          this.delete(id)
        }).catch(() => {
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  @mixin flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .view-approval {
    .batch-list {
      height: calc(100vh - 220px) !important;
    }

    .appli-list {
      // padding: 10px 0;
      max-height: calc(100vh - 140px);
      overflow-y: scroll;
    }

    .accept,
    .unaccept {
      .appli-item {
        width: unset;
        margin: 15px 10px;
      }
    }

    .wait-item {
      @include flex;
      background: none;
      margin: 15px 10px;

      .appli-item {
        margin-bottom: 0;
      }
    }

    .appli-item {
      width: 100%;
      background-color: #fff;
      border-radius: 4px;
      font-size: 16px;
      margin-bottom: 10px;
      box-shadow: 0 2px 5px #ccc;
      // margin: 15px 10px;

      // box-shadow: 0 0.0625rem 0.15625rem #ccc;
      .appli-head {
        @include flex;
        padding: 10px;
        font-size: 17px;

        .name {
          font-weight: bold;
        }

        .van-icon-ellipsis {
          color: #333;
        }
      }

      .appli-cnt {
        padding: 5px 10px;
        display: flex;
        justify-content: flex-start;

        .appli-cnt-title {
          color: #999999;
          min-width: 80px;
          flex-shrink: 0;
        }

        .appli-cnt-title:first-child {
          min-width: 40px;
        }
      }

      .appli-footer {
        border-top: 1px solid #eee;
        @include flex;
        padding: 10px 0;

        .time {
          color: #999;
          margin-left: 10px;
          font-size: 14px;
        }

        .state {
          @include flex;

          em {
            width: 1px;
            height: 18px;
            background: #eee;
          }

          span {
            padding: 0 15px;
            color: #1989fa;
          }
          .passed {
            color: #07c160;
          }

          .rejected,.delete{
            color: #D75252;
          }

        }
      }
    }

    .no-data {
      text-align: center;
      font-size: 16px;
      padding: 20px 0;
      color: #666;
    }
  }

</style>
<style lang="scss">
  .view-approval {
    .van-tab {
      font-size: 18px;
      color: #999;
    }

    .van-tab--active {
      color: #333;
    }
  }

</style>
