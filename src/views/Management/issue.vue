<template>
  <div class="issue">
    <van-nav-bar title="发布公告" left-text="返回" left-arrow @click-left="onClickLeft" class="bluenav" />
    <van-cell-group>
      <van-field class="field" v-model="form.title" rows="2" autosize label="标题"
        type="textarea" maxlength="15" placeholder="请填写标题" show-word-limit />
    </van-cell-group>
    <van-cell-group>
      <van-field class="field" v-model="form.content" rows="2" autosize label="内容"
        type="textarea" maxlength="150" placeholder="请输入内容" show-word-limit />
    </van-cell-group>
    <van-button type="info" class="info-btn" block @click="addnotice">发布公告</van-button>
  </div>
</template>
<script>
import { addnotice } from "@/api/manager";
export default {
  data(){
    return{
      form:{
        title:"",
        content:""
      }
    }
  },
  methods:{
    onClickLeft() {
      this.$router.go(-1);
    },
    async addnotice(){
      await addnotice(this.form).then(res => {
        if (res.code == 0) {
          this.$toast.success({
            message: "发布成功",
            duration: 1000,
            onClose:() => {
              this.$router.push({
                path:"notice",
              })
            }
          });
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .issue{
    .van-cell-group{
      &::after{
        content:unset;
      }
      .field {
        font-size: 16px;
        border-bottom: 1px solid #eee;
        .van-field__word-limit{
          font-size: 14px !important;
        }
      }
    }
    .van-button{
      height: 55px;
    }
  }
</style>
