<template>
  <div class="point-entry main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-cell title="选择规则分类" is-link :value="pointObj.ruleClassifiy" placeholder="请选择" />
    <van-cell title="选择分类" is-link :value="pointObj.classifiy" placeholder="请选择" />
    <van-cell title="日期" is-link :value="pointObj.date" @click="isDateShow = true" placeholder="请选择" />
    <van-field v-model="pointObj.integral" rows="1" label="积分" type="number" placeholder="请输入积分" />
    <van-field v-model="pointObj.reason" rows="2" autosize label="理由" type="textarea" maxlength="50" placeholder="请输入理由"
      show-word-limit />
  </div>
</template>

<script>
  export default {
    name: 'PointEntry',
    data() {
      return {
        title: '积分录入',
        isLeftArrow: true,
        isDateShow: false,
        pointObj: {
          ruleClassifiy: '',
          classifiy: '',
          date: '',
          reason: ''
        }


      }
    }
  }

</script>

<style lang="sass" scoped>

</style>
<style lang="scss">

</style>
