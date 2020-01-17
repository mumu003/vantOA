<template>
  <div class="approval-page main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <!-- <van-search placeholder="请输入搜索关键词" v-model="keyWord" /> -->
    <div class="batch-head" v-show="isBatch">
      <van-checkbox v-model="isAll">全选</van-checkbox>
      <span class="cancle" @click="cancle">取消</span>
    </div>
    <!-- 批量处理 -->
    <div class="batch-footer" v-show="isBatch">
      <span @click="allOperat(1)">拒绝</span>
      <span></span>
      <span @click="allOperat(2)">同意</span>
    </div>

    <van-tabs v-model="activeTab" color="#1989fa">
      <van-tab title="待审批">
        <van-loading size="24px" v-show="loading">加载中...</van-loading>
        <div class="no-data" v-if="loadFinished[0]">暂无数据</div>
        <template v-else>
          <!-- 超级管理员 -->
          <van-checkbox-group v-model="batchData" :class="{'appli-list':true, 'main-box':true, 'batch-list':isBatch}"
            v-if="roleId==1">
            <van-cell-group class="wait-item" v-for="(item1,index1) in waitList" :key="index1">
              <van-checkbox :name="item1.id" v-show="isBatch" />
              <div :class="{'appli-item':true,'batchActive':isBatch}">
                <div class="appli-head ">
                  <span class="name">{{item1.name}}</span>
                  <van-icon name="ellipsis" @click.stop="batchShow=!batchShow" v-show="!isBatch" />
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
                    <span @click="singleOperat(item1.id,1)">拒绝</span>
                    <em></em>
                    <span @click="singleOperat(item1.id,2)">同意</span>
                  </div>
                </div>
              </div>
            </van-cell-group>
          </van-checkbox-group>
          <!-- 普通管理员、员工 -->
          <van-checkbox-group :class="{'appli-list':true, 'main-box':true}" v-else>
            <van-cell-group class="wait-item" v-for="(item1,index1) in waitList" :key="index1">
              <div :class="{'appli-item':true,'batchActive':isBatch}">
                <div class="appli-head ">
                  <span class="name">{{item1.name}}</span>
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
            </van-cell-group>
          </van-checkbox-group>
          <!-- 超管批量操作 -->
          <van-popup v-model="batchShow" position="bottom" :style="{ height: '20%' }">
            <div class="main-box">
              <div class="more-operat" @click="batch">批量操作</div>
              <div class="more-operat" @click="batchShow=!batchShow">取消</div>
            </div>
          </van-popup>
        </template>

      </van-tab>
      <van-tab title="已通过">
        <van-loading size="24px" v-show="loading">加载中...</van-loading>
        <div class="no-data" v-if="loadFinished[1]">暂无数据</div>
        <div class="appli-list main-box accept" v-else>
          <div class="appli-item" v-for="(item2,index2) in passList" :key="index2">
            <div class="appli-head ">
              <span class="name">{{item2.name}}</span>
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
        <template v-else>
          <div class="appli-list main-box unaccept">
            <div class="appli-item" v-for="(item3,index3) in disagreeList" :key="index3">
              <div class="appli-head ">
                <span class="name">{{item3.name}}</span>
                <van-icon name="ellipsis" @click.stop="update(item3.id)" />
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
          <van-popup v-model="updateShow" position="bottom" :style="{ height: '20%' }">
            <div class="main-box">
              <div class="more-operat" @click="singleOperat(updateId,2)">更改为同意</div>
              <div class="more-operat" @click="updateShow=!updateShow">取消</div>
            </div>
          </van-popup>
        </template>
      </van-tab>
    </van-tabs>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import {
    findPointWait,
    findPointPass,
    findPointDisagree,
    passPoint,
    pointDisagree,
    deletePoint
  } from "@/api/integral";
  export default {
    name: "Approval",
    data() {
      return {
        title: '积分审批',
        isLeftArrow: true,
        keyWord: '',
        activeTab: 0,
        isBatch: false, //是否批量状态
        batchShow: false,
        batchData: [], //批量数据d
        isAll: false,
        updateShow: false,
        roleId: '', //角色id
        updateId: '', //更改Id
        waitList: [], //待审核
        passList: [], //已通过
        disagreeList: [], //未通过
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
      batch() {
        document.querySelector('.van-tabs__wrap').style.display = "none"
        this.isBatch = true
        this.batchShow = false
      },
      cancle() {
        document.querySelector('.van-tabs__wrap').style.display = "block"
        this.isBatch = false
      },
      // 获取审批列表
      async getList() {
        this.loading = true
        // 待审批
        await findPointWait().then(res => {
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
        await findPointPass().then(res => {
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
        await findPointDisagree().then(res => {
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
      async deletePoint(id) {
        await deletePoint(id).then(res => {
          if (res.code == 0) {
            this.$toast("删除成功!")
          } else {
            this.$toast(res.msg)
          }
        })
      },
      // 删除审批申请
      delete(id) {
        this.$dialog.confirm({
          message: '确定删除该条申请？'
        }).then(() => {
          this.deletePoint(id)
        })
      },
      // 单个操作
      async singleOperat(id, type) {
        let ids = []
        ids.push(id)
        if (type == 1) {
          // 拒绝
          await pointDisagree(ids).then(res => {
            if (res.code == 0) {
              this.$toast("操作成功!")
            } else if (res.code == -1) {
              this.$toast(res.msg)
            }
          })
        } else {
          // 通过
          await passPoint(ids).then(res => {
            if (res.code == 0) {
              if (this.updateShow) {
                this.updateShow = !this.updateShow
              }
              this.$toast("操作成功!")
            } else if (res.code == -1) {
              this.$toast(res.msg)
            }
          })
        }
      },
      // 批量操作
      async allOperat(type) {
        if (type == 1) {
          if (this.batchData == '') {
            this.$toast("请选择要操作的数据!")
          } else {
            await pointDisagree(this.batchData).then(res => {
              if (res.code == 0) {
                this.$toast("操作成功!")
              } else if (res.code == -1) {
                this.$toast(res.msg)
              }
            })
          }
        } else {
          await passPoint(this.batchData).then(res => {
            if (this.batchData == '') {
              this.$toast("请选择要操作的数据!")
            } else {
              if (res.code == 0) {
                this.$toast("操作成功!")
              } else if (res.code == -1) {
                this.$toast(res.msg)
              }
            }

          })
        }
      },
      update(id) {
        this.updateShow = true
        this.updateId = id
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

  .approval-page {
    .batch-head {
      @include flex;
      font-size: 16px;
      background: #fff;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
      padding: 10px 15px;

      .cancle {
        color: #1989fa;
      }
    }

    .batch-footer {
      z-index: 1000;
      width: 100%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.28);
      background: #fff;
      position: fixed;
      bottom: 45px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px 12px;

      span {
        color: #1989fa;
        font-size: 16px;
      }

      span:nth-child(2) {
        display: block;
        width: 1px;
        height: 28px;
        background: #eee;
      }
    }

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

    .batchActive {
      margin-left: 5px;
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

          .rejecte,
          .delete {
            color: #D75252;
          }
        }
      }
    }

    .more-operat {
      width: 100%;
      background: #fff;
      color: #1989fa;
      padding: 10px;
      text-align: center;
      font-size: 16px;
      margin-top: 10px;
      border-radius: 12px;
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
  .approval-page {
    .van-tab {
      font-size: 18px;
      color: #999;
    }

    .van-tab--active {
      color: #333;
    }

    .van-checkbox__icon {
      margin-right: 5px;
    }

    .van-popup {
      background: none;
    }
  }

</style>
