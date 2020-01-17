<template>
  <div class="mine main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow' :isFixed='isFixed'></nav-bar>
    <div v-if="!isSetShow">
      <div class="user-info">
        <van-image round
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579150814844&di=9c18d02255eecfc420c994089535bf2d&imgtype=0&src=http%3A%2F%2Fwww.17qq.com%2Fimg_qqtouxiang%2F71807977.jpeg" />
        <div class="user-name">{{userInfo.name}}</div>
        <!-- <div class="qr-code"></div> -->
      </div>
      <van-cell-group class="info-list">
        <van-field label="个人账号" :value="userInfo.phone" readonly />
        <van-field label="姓名" :value="userInfo.name" readonly @click="updateName" />
        <van-field label="手机号" :value="userInfo.phone" readonly @click="updateMobile" />
        <van-field label="密码" type="password" :value="userInfo.pwd" readonly @click="updatePwd" />
      </van-cell-group>
    </div>
    <van-button type="info" class="info-btn" block @click="logout">注销</van-button>
    <!-- 修改 -->
    <div class="update-modal" v-if="isSetShow">
      <van-nav-bar :title="setTitle" left-arrow right-text="保存" @click-left="back" @click-right="save" />
      <van-cell-group>
        <van-field v-model="userInfo.name" placeholder="请输入新名称" maxlength="12" v-show="isSetName" />

        <van-field type="tel" v-model="userInfo.phone" placeholder="请输入新手机号" v-show="isSetMoblie" />
        <van-field type="password" v-model="userInfo.pwd" placeholder="请输入6-20位密码" maxlength="20" v-show="isSetPwd" />

      </van-cell-group>
      <span class="name-tip" v-show="isSetName">名称仅支持2-12个字符</span>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import * as types from "../../store/types";
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
        let info = this.$store.state.userinfo
        this.userInfo = {
          id: info.id,
          departId: info.departId,
          roleId: info.roleId,
          name: info.name,
          phone: info.phone,
          pwd: info.pwd
        }
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
      // 手机号码校验
      mobileValidate(val) {
        if ((/^1[0-9]\d{9}$/.test(val))) {
          return true
        } else {
          return false
        }
      },
      // 保存
      async save() {
        if (this.isSetName) {
          if (this.userInfo.name == '') {
            this.$toast("名称不能为空!")
          } else {
            if (this.userInfo.name.length < 2) {
              this.$toast("请输入2-12位的字符!")
            } else {
              await updatename(this.userInfo).then(res => {
                if (res.code == 0) {
                  this.$toast.success("修改成功!")
                  this.back()
                }
              })
            }

          }
        } else if (this.isSetMoblie) {
          if (this.userInfo.phone == '') {
            this.$toast("手机号不能为空!")
          } else {
            if (!this.mobileValidate(this.userInfo.phone)) {
              this.$toast.fail("请输入正确的手机号")
              return
            } else {
              await updatename(this.userInfo).then(res => {
                if (res.code == 0) {
                  this.$toast.success("修改成功!")
                  this.back()
                } else if (res.code == -1) {
                  this.$toast("手机号已经存在，请重新修改!")
                }
              })
            }
          }

        } else if (this.isSetPwd) {
          if (this.userInfo.pwd == '') {
            this.$toast("密码不能为空!")
          } else {
            if (this.userInfo.pwd.length < 6) {
              this.$toast("为安全起见，请输入6-20位的密码!")
            } else {
              await updatename(this.userInfo).then(res => {
                if (res.code == 0) {
                  this.$toast.success("修改成功!")
                  this.back()
                }
              })
            }
          }
        }
      },
       async logout() {
        this.$store.commit(types.LOGOUT);
        this.$router.push({
          path: "login"
        });
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
    .name-tip {
      font-size: 14px;
      color: #666;
      margin-left: 15px;
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

  }

</style>
