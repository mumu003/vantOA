<template>
  <div class="release-task main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-cell-group>
      <van-field v-model="taskObj.taskTitle" rows="2" autosize label="任务标题" type="textarea" maxlength="50"
        placeholder="请输入任务标题" show-word-limit />
      <van-field v-model="taskObj.taskCnt" rows="2" autosize label="任务内容" type="textarea" maxlength="100"
        placeholder="请输入任务内容" show-word-limit />
      <van-field v-model="taskObj.integral" rows="1" label="积分" type="number" placeholder="请输入积分" />
      <van-cell title="截止日期" is-link :value="taskObj.endTime" @click="isDateShow = true" />
      <van-calendar v-model="isDateShow" color="#1989fa" @confirm="onConfirm" />
      <van-cell is-link @click="isMemberShow=!isMemberShow">选择人员</van-cell>
      <van-popup round v-model="isMemberShow" position="bottom" :style="{ height: '60%' }">
        <div class="member-title main-box">
          <span>请选择人员</span>
          <span @click="toSelect">确定</span>
        </div>
        <van-tabs v-model="activeTab" color="#1989fa" class="main-box">
          <van-tab title="选择部门" name="dept">
            
          </van-tab>
          <van-tab title="选择人员" name="men">

          </van-tab>
        </van-tabs>
      </van-popup>
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
        taskObj: {
          taskTitle: '',
          taskCnt: '',
          integral: 0, //积分
          endTime: '', //截止时间
        },

        isDateShow: false,
        isMemberShow: false,
        activeTab: 'dept',
        value: '',
        showPicker: false,
      
      }
    },
    methods: {
      formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}`
      },
      onConfirm(endTime) {
        this.isDateShow = false
        this.endTime = this.formatDate(endTime)
      },
      // 人员选中
      toSelect() {

      },
      
    }
  }

</script>

<style lang="scss" scoped>
  .release-task {
    .member-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      padding-top: 20px;
      padding-bottom: 10px;
    }
  }

</style>
<style lang="scss">
  .release-task {
    .van-field__control {
      text-align: right;
    }

    .van-tab {
      flex: unset;
      padding: 0;
      padding-right: 10px;
      font-size: 16px;
    }

    [class*=van-hairline]::after {
      border: none;
    }
  }

</style>
