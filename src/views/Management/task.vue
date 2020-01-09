<template>
  <div class="release-task main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-cell-group>
      <van-field v-model="taskTitle" rows="2" autosize label="任务标题" type="textarea" maxlength="50" placeholder="请输入任务标题"
        show-word-limit />
      <van-field v-model="taskCnt" rows="2" autosize label="任务内容" type="textarea" maxlength="100" placeholder="请输入任务内容"
        show-word-limit />
      <van-field v-model="integral" rows="1" autosize label="积分" type="textarea" placeholder="请输入积分" />
      <van-cell title="截止日期" :value="endTime" @click="dateShow = true" />
      <van-calendar v-model="dateShow" @confirm="onConfirm" />
    </van-cell-group>
  </div>
</template>
<script>
  export default {
    name: 'ReleaseTask',
    data() {
      return {
        title: '发布任务',
        isLeftArrow: true,
        taskTitle: '',
        taskCnt: '',
        integral: 0, //积分
        endTime: '', //截止时间
        dateShow: false
      }
    },
    methods: {
      formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}`;
      },
      onConfirm(endTime) {
        this.dateShow = false;
        this.endTime = this.formatDate(endTime);
      }
    }
  }

</script>

<style lang="scss" scoped>
  .main-box {
    margin-left: 15px;
    margin-right: 15px;
  }

</style>
