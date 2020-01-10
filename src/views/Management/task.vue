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
      <van-calendar v-model="isDateShow" color="#1989fa" @confirm="dateConfirm" />
      <van-cell is-link @click="isMemberShow=!isMemberShow">选择人员</van-cell>
      <van-popup round v-model="isMemberShow" position="bottom" :style="{ height: '60%' }">
        <div class="member-title main-box">
          <span>请选择人员</span>
          <span @click="toSelect">确定</span>
        </div>
        <van-tabs v-model="activeTab" color="#1989fa" class="main-box">
          <van-tab title="选择部门" name="dept" class="dept-area">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="(item,index) in deptList" :key="index" :title="item.name" @click="deptConfirm(item.id)"/>
            </van-list>
          </van-tab>
          <van-tab title="选择人员" name="men">
            <van-checkbox-group v-model="finalList" class="men-area">
              <van-checkbox :name="`${val.name}`" v-for="(val,i) in memberList" :key="i">{{val.name}}</van-checkbox>
            </van-checkbox-group>
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
        deptList: [{
          id:1,
          name:'技术部'
        },{
          id:6,
          name:'人事部'
        },{
          id:21,
          name:'运营部'
        }],
        memberList:[{
          id:1,
          name:'张三'
        },{
          id:6,
          name:'李四'
        }],
        finalList:[],//最终选中
        loading: false,
        finished: false
      }
    },
    methods: {
      formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}`
      },
      dateConfirm(endTime) {
        this.isDateShow = false
        this.endTime = this.formatDate(endTime)
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.deptList.push(this.deptList.length + 1)
          }
          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (this.deptList.length >= 40) {
            this.finished = true
          }
        }, 500);
      },
      // 部门选中
      deptConfirm(deptId){
        console.log(deptId)
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
      span:last-child{
        color: #1989fa;
      }
    }
    .dept-area{
      .van-cell{
        padding-left: 0;
        padding-right: 0;
      }
      .van-cell:not(:last-child)::after{
        border: none;
      }
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
    .men-area{
      .van-checkbox{
        padding: 10px 0;
      }
      .van-checkbox__label{
        font-size: 16px;
      }
    }
  }

</style>
