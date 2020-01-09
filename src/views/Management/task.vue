<template>
  <div class="release-task main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-cell-group>
      <van-field v-model="taskTitle" rows="2" autosize label="任务标题" type="textarea" maxlength="50" placeholder="请输入任务标题"
        show-word-limit />
      <van-field v-model="taskCnt" rows="2" autosize label="任务内容" type="textarea" maxlength="100" placeholder="请输入任务内容"
        show-word-limit />
      <van-field v-model="integral" rows="1" label="积分" type="number" placeholder="请输入积分" />
      <van-cell title="截止日期" is-link :value="endTime" @click="isDateShow = true" />
      <van-calendar v-model="isDateShow" color="#1989fa" @confirm="onConfirm" />
      <van-cell is-link @click="isMemberShow=!isMemberShow">选择人员</van-cell>
      <van-popup round v-model="isMemberShow" position="bottom" :style="{ height: '60%' }">
        <div class="member-title main-box">
          <span>请选择人员</span>
          <span @click="toSelect">确定</span>
        </div>
        <van-tabs v-model="activeTab" color="#1989fa" class="main-box">
          <van-tab title="选择部门" name="dept">
            <van-field readonly clickable label="城市" :value="value" placeholder="选择城市" @click="showPicker = true" />
            <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm1"
              @change="onChange" />
          </van-tab>
          <van-tab title="选择人员" name="men">

          </van-tab>
        </van-tabs>
      </van-popup>
    </van-cell-group>
  </div>
</template>
<script>
  const citys = {
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州']
  };
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
        isDateShow: false,
        isMemberShow: false,
        activeTab: 'dept',
        value: '',
        showPicker: false,
        columns: [{
            values: Object.keys(citys),
            className: 'column1'
          },
          {
            values: citys['浙江'],
            className: 'column2',
            defaultIndex: 2
          }
        ]
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
      onConfirm1(value) {
        this.value = value[0] + '-' + value[1];
        this.showPicker = false;
      },
      onChange(picker, values) {
        picker.setColumnValues(1, citys[values[0]]);
      }
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
