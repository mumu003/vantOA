<template>
  <div class="release-task main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-cell-group>
      <van-field v-model="taskObj.title" rows="2" autosize label="任务标题" type="textarea" maxlength="50"
        placeholder="请输入任务标题" show-word-limit />
      <van-field v-model="taskObj.content" rows="2" autosize label="任务内容" type="textarea" maxlength="100"
        placeholder="请输入任务内容" show-word-limit />
      <van-field class="score" v-model="taskObj.score" rows="1" label="积分" type="number" min="0" placeholder="请输入积分" />
      <van-cell title="截止日期" is-link :value="taskObj.endTime" @click="isDateShow = true" />
      <van-calendar v-model="isDateShow" color="#1989fa" @confirm="dateConfirm" />
      <van-cell is-link @click="isMemberShow=!isMemberShow">选择人员
        <span class="tip">请选择</span>
      </van-cell>
      <div class="main-box">
        <van-tag closeable round plain @close="remove(index)" v-for="(item,index) in finalList" :key="index">
          {{item}}
        </van-tag>
      </div>
      <van-popup round v-model="isMemberShow" position="bottom" :style="{ height: '60%' }">
        <div class="member-title main-box">
          <span>请选择人员</span>
          <span @click="toSelect">确定</span>
        </div>
        <van-tabs v-model="activeTab" color="#1989fa" class="main-box">
          <van-tab title="选择部门" name="dept" class="dept-area">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <van-cell :class="activeDept==index?'dept-active':''" v-for="(item,index) in list" :key="index"
                :title="item.name" @click="deptConfirm(item.id,index)" />
            </van-list>
          </van-tab>
          <van-tab title="选择人员" name="men">
            <van-checkbox-group v-model="taskObj.employeesId" class="men-area">
              <van-checkbox :name="`${val.id}`" v-for="(val,i) in memberList" :key="i" @click="menConfirm(val.name)">
                {{val.name}}</van-checkbox>
            </van-checkbox-group>
          </van-tab>
        </van-tabs>
      </van-popup>
    </van-cell-group>
    <van-button type="info" class="info-btn" block @click="addTask">发布任务</van-button>

  </div>
</template>
<script>
  import { addTask } from "@/api/task";
  import { findAll,findList } from "@/api/dept";

  export default {
    name: 'ReleaseTask',
    data() {
      return {
        title: '发布任务',
        isLeftArrow: true,
        taskObj: {
          title: '',
          content: '',
          score: 0, //积分
          endTime: '请选择', //截止时间
          // degree: '',
          employeesId: []
        },
        isDateShow: false,
        isMemberShow: false,
        activeTab: 'dept',
        showPicker: false,
        list: [],
        deptList: [],
        memberList: [],
        activeDept: -1,
        finalList: [], //最终选中
        loading: false,
        finished: false
      }
    },
    mounted() {
      this.getDeptList()
    },

    methods: {
      // 获取部门列表
      async getDeptList() {
        await findAll().then(res => {
          console.log(res)
          if (res.code == 0) {
            this.deptList = res.data
            this.list = this.deptList
          }
        });
      },
      // 格式化日期
      formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      },
      dateConfirm(endTime) {
        this.isDateShow = false
        this.taskObj.endTime = this.formatDate(endTime)
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (this.list.length >= this.deptList.length) {
            this.finished = true
          }
        }, 500);
      },
      // 部门选中
      async deptConfirm(departId, index) {
        this.activeDept = index
        let data = {
          departId
        }
        await findList(data).then(res => {
          console.log(res)
          if (res.code == 0) {
            this.memberList=res.data
          }
        })
      },
      menConfirm(name) {
        this.finalList.push(name)
      },
      // 人员选中
      toSelect() {
        this.isMemberShow = false
      },
      remove(i) {
        this.finalList.splice(i, 1)
        this.taskObj.employeesId.splice(i, 1)
      },
      async addTask() {
        if (this.taskObj.title == '' || this.taskObj.content == '' || this.taskObj.score == '' || this.taskObj.employeesId == '' || this.taskObj.endTime == '') {
          this.$toast("请输入完整内容再提交")
        } else {
          this.taskObj.employeesId=this.taskObj.employeesId.map(Number)
          await addTask(this.taskObj).then(res => {
            if (res.code == 0) {
              this.$toast("发布成功")
            }
          })
        }
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
      font-size: 16px;
      padding-top: 20px;
      padding-bottom: 10px;

      span:last-child {
        color: #1989fa;
      }
    }

    .van-tag {
      color: #333;
      font-size: 14px;
      border: 1px solid #D6D6D6;
      margin-right: 10px;
      padding: 5px 10px;

      .van-tag__close {
        color: #D8D8D8;
        border-radius: 50%;
        font-size: 10px;
        border: 1px solid #D8D8D8;
      }
    }

    .tip {
      float: right;
      color: #969799;
    }

    .dept-area {
      .van-cell {
        padding-left: 0;
        padding-right: 0;
      }

      .van-cell:not(:last-child)::after {
        border: none;
      }

      .dept-active span {
        color: #1989fa;
      }
    }

    .main-box {
      padding-bottom: 20px;
    }


  }

</style>
<style lang="scss">
  .release-task {
    .score .van-field__control {
      text-align: right;
    }

    .van-tab {
      flex: unset;
      padding: 0;
      padding-right: 10px;
      font-size: 15px;
    }

    .van-cell__title {
      font-size: 15px;
    }

    [class*=van-hairline]::after {
      border: none;
    }

    .van-cell:not(:last-child)::after {
      border: none;
    }

    .men-area {
      .van-checkbox {
        padding: 10px 0;
      }

      .van-checkbox__label {
        font-size: 16px;
      }
    }
  }

</style>
