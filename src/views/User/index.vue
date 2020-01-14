<template>
  <div class="mine main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow' :isFixed='isFixed'></nav-bar>
    <div v-if="!isSetShow">
      <div class="user-info">
        <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="user-name">{{userInfo.name}}</div>
        <div class="qr-code"></div>
      </div>
      <van-cell-group class="info-list">
        <van-field label="个人账号" :value="userInfo.phone" readonly />
        <van-field label="姓名" :value="userInfo.name" readonly @click="updateName" />
        <van-field label="手机号" :value="userInfo.phone" readonly @click="updateMobile" />
        <van-field label="密码" type="password" :value="userInfo.pwd" readonly @click="updatePwd" />
      </van-cell-group>
    </div>
    <!-- 修改 -->
    <div class="update-modal" v-if="isSetShow">
      <van-nav-bar :title="setTitle" left-arrow right-text="保存" @click-left="back" @click-right="save" />
      <van-cell-group>
        <van-field v-model="userInfo.name" placeholder="请输入新名称" v-show="isSetName" />
        <van-field type="tel" v-model="userInfo.phone" placeholder="请输入新手机号" v-show="isSetMoblie" />
        <van-field type="password" v-model="userInfo.pwd" placeholder="请输入新密码" v-show="isSetPwd" />

      </van-cell-group>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import {
    updatename,
    updatephone,
    updatepwd
  } from "@/api/user";
  export default {
    name: 'User',
    data() {
      return {
        title: '我的',
        isLeftArrow: false,
        isFixed: true,
        isSetShow: false,
        isSetName: false,
        isSetMoblie: false,
        isSetPwd: false,
        setTitle: '',
        userInfo: {
          id: '',
          departId: '',
          roleId: '',
          name: '',
          phone: '',
          pwd: ''
        }
      }
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        let info = JSON.parse(localStorage.getItem("userinfo"))

        this.userInfo.id = info.id
        this.userInfo.departId = info.departId
        this.userInfo.roleId = info.roleId
        this.userInfo.name = info.name
        this.userInfo.phone = info.phone
        this.userInfo.pwd = info.pwd
      },
      updateName() {
        this.setTitle = '修改名称'
        this.isSetShow = true
        this.isSetName = true
      },
      updateMobile() {
        this.setTitle = '修改手机号'
        this.isSetShow = true
        this.isSetMoblie = true
      },
      updatePwd() {
        this.setTitle = '修改密码'
        this.isSetShow = true
        this.isSetPwd = true
      },
      back() {
        this.isSetShow = false
        this.isSetName = false
        this.isSetMoblie = false
        this.isSetPwd = false
      },
      // 保存
      async save() {
        console.log(this.userInfo)
        if (this.isSetName) {
          if (this.userInfo.name == '') {
            this.$toast("名称不能为空!")
          } else {
            await updatename(this.userInfo).then(res => {
              if (res.code == 0) {
                this.$toast("修改成功!")
                this.back()
              }
            })
          }
        } else if (this.isSetMoblie) {
          if (this.userInfo.phone == '') {
            this.$toast("手机号不能为空!")
          } else {
            await updatename(this.userInfo).then(res => {
              console.log(res)
              if (res.code == 0) {
                this.$toast("修改成功!")
                this.back()
              } else if (res.code == -1) {
                this.$toast("手机号已经存在，请重新修改!")
              }
            })
          }
        } else if (this.isSetPwd) {
          if (this.userInfo.phone == '') {
            this.$toast("密码不能为空!")
          } else {
            await updatename(this.userInfo).then(res => {
              console.log(res)
              if (res.code == 0) {
                this.$toast("修改成功!")
                this.back()
              }
            })

          }
        }
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

    .info-list .van-field__control {
      text-align: right;
    }

    .setting {
      .van-icon {
        font-size: 14px;
        color: #999;
      }
    }
  }

</style>
