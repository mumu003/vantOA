<template>
  <div class="point-entry main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-cell title="选择规则分类" is-link :value="pointObj.ruleClassifiy" placeholder="请选择" />
    <van-cell title="选择分类" is-link :value="pointObj.classifiy" placeholder="请选择" />
    <van-cell title="日期" is-link :value="pointObj.date" @click="isDateShow = true" placeholder="请选择" />
    <van-field v-model="pointObj.integral" rows="1" label="积分" type="number" placeholder="请输入积分" />
    <van-field class="reason-cnt" v-model="pointObj.reason" rows="2" autosize label="理由" type="textarea" maxlength="50"
      placeholder="请输入理由（选填）" show-word-limit />
    <div class="line"></div>
    <van-cell is-link @click="isMemberShow=!isMemberShow">选择人员
      <span class="tip">请选择</span>
    </van-cell>
    <div class="main-box">
      <van-tag closeable round plain @close="remove" v-for="(item,index) in finalList" :key="index">
        标签
      </van-tag>

    </div>
    <van-popup round v-model="isMemberShow" position="bottom" :style="{ height: '60%' }">
      <div class="member-title main-box">
        <span>请选择人员</span>
        <span @click="toSelect">确定</span>
      </div>
      <van-tabs v-model="activeTab" color="#1989fa" class="main-box">
        <van-tab title="选择部门" name="dept" class="dept-area">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell :class="activeDept==index?'dept-active':''" v-for="(item,index) in deptList" :key="index"
              :title="item.name" @click="deptConfirm(item.id,index)" />
          </van-list>
        </van-tab>
        <van-tab title="选择人员" name="men">
          <van-checkbox-group v-model="finalList" class="men-area">
            <van-checkbox :name="`${val.name}`" v-for="(val,i) in memberList" :key="i">{{val.name}}</van-checkbox>
          </van-checkbox-group>
        </van-tab>
      </van-tabs>
    </van-popup>
    <van-button type="info" class="info-btn" block @click="submit">提交信息</van-button>
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
        },
        isMemberShow: false,
        activeTab: 'dept',
        showPicker: false,
        deptList: [{
          id: 1,
          name: '技术部'
        }, {
          id: 6,
          name: '人事部'
        }, {
          id: 21,
          name: '运营部'
        }],
        memberList: [{
          id: 1,
          name: '张三'
        }, {
          id: 6,
          name: '李四'
        }],
        activeDept: -1,
        finalList: [], //最终选中
        loading: false,
        finished: false


      }
    },
    methods: {
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
      deptConfirm(deptId, index) {
        this.activeDept = index
        console.log(deptId)
      },
      // 人员选中
      toSelect() {
        this.isMemberShow = false
      },
      remove() {

      },
      submit() {

      }
    }

  }

</script>

<style lang="scss" scoped>
  .point-entry {
    .reason-cnt::after {
      border: none;
    }

    .line {
      width: 100%;
      height: 8px;
      background: #F7F7F7;
    }

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
  .point-entry {
    .van-tab {
      flex: unset;
      padding: 0;
      padding-right: 10px;
      font-size: 15px;
    }

    .van-cell:not(:last-child)::after {
      border: none;
    }

    [class*=van-hairline]::after {
      border: none;
    }

    .van-cell__title {
      font-size: 15px;
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
