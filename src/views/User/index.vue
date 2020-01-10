<template>
  <div class="mine main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow' :isFixed='isFixed'></nav-bar>
    <div v-if="!isSetShow">
      <div class="user-info">
        <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="user-name">张三</div>
        <div class="qr-code"></div>
      </div>
      <div class="related-list">
        <div class="related-item">
          <span>个人账号</span>
          <span>1111111</span>
        </div>
        <div class="related-item">
          <span>入职时间</span>
          <span>111111111</span>
        </div>
        <div class="related-item">
          <span>工龄</span>
          <span>测试测试</span>
        </div>
        <div class="related-item">
          <span>生日</span>
          <span>22222</span>
        </div>
        <div class="related-item">
          <span>部门</span>
          <span>测试测试</span>
        </div>
        <div class="related-item">
          <span>职务</span>
          <span>测试测试</span>
        </div>
        <div class="related-item">
          <span>手机</span>
          <span>1323435354</span>
        </div>
        <div class="related-item">
          <span>微信</span>
          <span>5535353532</span>
        </div>

      </div>
      <div class="setting" @click="isSetShow=true">
        <span>设置</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 设置 -->
    <div class="update-modal" v-if="isSetShow">
      <van-nav-bar title="设置" left-arrow @click-left="isSetShow=false" />
      <van-cell-group>
        <van-field label="名称" v-model="username" placeholder="请输入新名称" />
        <van-field label="密码" type="password" v-model="password" placeholder="请输入新密码" />
        <van-field label="手机" type="tel" v-model="mobile" placeholder="请输入新手机号" />
      </van-cell-group>
      <van-button type="info" class="info-btn" block @click="save">保存</van-button>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data() {
      return {
        title: '我的',
        isLeftArrow: false,
        isFixed: true,
        isSetShow: false
      }
    },
    methods: {
      save() {

      }
    }
  }

</script>

<style lang="scss" scoped>
  .mine {
    height: calc(100vh - 90px);
    overflow-y: scroll;

    .user-info {
      padding: 10px 15px;
      background: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      position: relative;

      .user-name {
        font-size: 14px;
      }

      .qr-code {
        width: 60px;
        height: 60px;
        position: absolute;
        right: 15px;
        background: #ccc;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }

    .related-list {
      margin-top: 10px;
      background: #fff;

      span {
        font-size: 14px;
      }

      .related-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 15px;
        border-bottom: 1px solid #F9FAFB;

        span:first-child {
          color: #333;
        }

        span:last-child {
          color: #999;
        }
      }

      .related-item:last-child {
        border-bottom: none;
      }
    }

    .setting {
      margin: 10px 0;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;

      span {
        color: #333;
        font-size: 14px;
      }
    }
  }

</style>
<style lang="scss">
  .mine {
    .van-image {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      margin-right: 10px;
    }

    .setting {
      .van-icon {
        font-size: 14px;
        color: #999;
      }
    }

    .van-hairline--bottom::after {
      border-width: 0;
    }
  }

</style>
