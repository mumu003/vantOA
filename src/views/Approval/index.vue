<template>
  <div class="approval-page main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-search placeholder="请输入搜索关键词" shape="round" v-model="keyWord" />
    <div class="batch-head" v-show="isBatch">
      <van-checkbox v-model="isAll">全选</van-checkbox>
      <span class="cancle">取消</span>
    </div>
    <van-tabs v-model="activeTab" color="#1989fa">
      <van-tab title="待审批">
        <van-checkbox-group v-model="result" ref="checkboxGroup" class="appli-list main-box">
          <van-checkbox name="a">
            <div class="appli-item">
              <div class="appli-head ">
                <span class="name">籍影博提交积分申请</span>
                <van-icon name="ellipsis" @click.stop="batchShow=!batchShow" />
              </div>
              <div class="appli-cnt">
                <span class="appli-cnt-title ">规则：</span>
                <span class="appli-cnt-info">显示申请积分时候所选的积分规则文字</span>
              </div>
              <div class="appli-cnt">
                <span class="appli-cnt-title">申请理由：</span>
                <span class="appli-cnt-info">显示申请积分时候所选的申请理由文字</span>
              </div>
              <div class="appli-cnt">
                <span class="appli-cnt-title">申请积分：</span>
                <span class="appli-cnt-info">+20分</span>
              </div>
              <div class="appli-footer">
                <span class="time">2020-01-10</span>
                <div class="state">
                  <span>拒绝</span>
                  <em>|</em>
                  <span>同意</span>
                </div>
              </div>
            </div>
          </van-checkbox>
        </van-checkbox-group>
        <van-popup v-model="batchShow" position="bottom" :style="{ height: '20%' }">
          <div class="main-box">
            <div class="more-operat" @click="batch">批量操作</div>
            <div class="more-operat" @click="batchShow=!batchShow">取消</div>
          </div>
        </van-popup>
      </van-tab>
      <van-tab title="已通过">
        <div class="appli-list main-box">
          <div class="appli-item">
            <div class="appli-head ">
              <span class="name">籍影博提交积分申请</span>
            </div>
            <div class="appli-cnt">
              <span class="appli-cnt-title ">规则：</span>
              <span class="appli-cnt-info">显示申请积分时候所选的积分规则文字</span>
            </div>
            <div class="appli-cnt">
              <span class="appli-cnt-title">申请理由：</span>
              <span class="appli-cnt-info">显示申请积分时候所选的申请理由文字</span>
            </div>
            <div class="appli-cnt">
              <span class="appli-cnt-title">申请积分：</span>
              <span class="appli-cnt-info">+20分</span>
            </div>
            <div class="appli-footer">
              <span class="time">2020-01-10</span>
              <div class="state">
                <span class="passed">已通过</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="未通过">
        <div class="appli-list main-box">
          <div class="appli-item">
            <div class="appli-head ">
              <span class="name">籍影博提交积分申请</span>
              <van-icon name="ellipsis" @click.stop="updateShow=!updateShow" />
            </div>
            <div class="appli-cnt">
              <span class="appli-cnt-title ">规则：</span>
              <span class="appli-cnt-info">显示申请积分时候所选的积分规则文字</span>
            </div>
            <div class="appli-cnt">
              <span class="appli-cnt-title">申请理由：</span>
              <span class="appli-cnt-info">显示申请积分时候所选的申请理由文字</span>
            </div>
            <div class="appli-cnt">
              <span class="appli-cnt-title">申请积分：</span>
              <span class="appli-cnt-info">+20分</span>
            </div>
            <div class="appli-footer">
              <span class="time">2020-01-10</span>
              <div class="state">
                <span class="rejected">已拒绝</span>
              </div>
            </div>
          </div>
        </div>
        <van-popup v-model="updateShow" position="bottom" :style="{ height: '20%' }">
          <div class="main-box">
            <div class="more-operat" @click="update">更改为同意</div>
            <div class="more-operat" @click="updateShow=!updateShow">取消</div>
          </div>
        </van-popup>
      </van-tab>
    </van-tabs>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
  export default {
    name: "Approval",
    data() {
      return {
        title: '积分审批',
        isLeftArrow: true,
        keyWord: '',
        activeTab: 0,
        isBatch: false,
        batchShow: false,
        result: [],
        isAll: false,
        updateShow: false
      }
    },
    methods: {
      batch() {
        document.querySelector('.van-tabs__content .van-checkbox__icon').style.display = "block"
        document.querySelector('.van-tabs__content .van-checkbox__label').style.marginLeft = "8px"
        document.querySelector('.van-tabs__wrap').style.display = "none"
        this.isBatch = true
        this.batchShow = false
      }

    }
  }

</script>

<style lang="scss" scoped>
  .approval-page {
    .batch-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      background: #fff;
      padding: 10px 15px;

      .cancle {
        color: #1989fa;
      }
    }

    .appli-list {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .appli-item {
      background-color: #fff;
      border-radius: 4px;
      font-size: 16px;

      // box-shadow: 0 0.0625rem 0.15625rem #ccc;
      .appli-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        font-size: 17px;

        .name {
          font-weight: bold;
        }

        .van-icon-ellipsis {
          color: #E4E4E4;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;

        .time {
          color: #999;
          margin-left: 10px;
          font-size: 14px;
        }

        .state {
          em{
            color: #eee;
          }
          span {
            padding: 0 10px;
            color: #1989fa;
          }

          .passed {
            color: #52D77B;
          }

          .rejected {
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

    .appli-list {
      .van-checkbox__icon {
        display: none;
      }

      .van-checkbox__label {
        margin-left: 0;
      }
    }

    .van-popup {
      background: none;
    }
  }

</style>
