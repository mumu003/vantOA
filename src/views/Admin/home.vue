<template>
  <div class="admin-home main-cnt">
    <nav-bar :title='title'></nav-bar>
    <div class="admin-info">
      <span class="name">管理员：{{adminName}}</span>
      <span>{{curDate}}</span>
      <span>合计部门共 {{adminData.depetCount}} 个，员工 {{adminData.emplCount}} 名</span>
    </div>
    <div class="summary-list" v-if="adminData">
      <div class="summary-item">
        <div class="the-more">
          <span>昨日加分最多的规则为：</span>
          <span>{{adminData.increaseByYesterday.name}}</span>
          <span class="num">共 {{adminData.increaseByYesterday.count}} 条</span>
        </div>
        <div class="the-less">
          <span>扣分最多的规则为：</span>
          <span>{{adminData.reduceByYesterday.name}}</span>
          <span class="num">共 {{adminData.reduceByYesterday.count}} 条</span>
        </div>
      </div>
      <div class="summary-item">
        <div class="the-more">
          <span>本月审批加分最多的规则为：</span>
          <span>{{adminData.increaseByMoth.name}}</span>
          <span class="num">共 {{adminData.increaseByMoth.count}} 条</span>
        </div>
        <div class="the-less">
          <span>扣分最多的规则为：</span>
          <span>{{adminData.reduceByMoth.name}}</span>
          <span class="num">共 {{adminData.reduceByMoth.count}} 条</span>
        </div>
      </div>
      <div class="summary-item">
        <div class="the-more">
          <span>本年审批加分最多的规则为：</span>
          <span>{{adminData.increaseByYearMap.name}}</span>
          <span class="num">共 {{adminData.increaseByYearMap.count}} 条</span>
        </div>
        <div class="the-less">
          <span>扣分最多的规则为：</span>
          <span>{{adminData.reduceByYear.name}}</span>
          <span class="num">共 {{adminData.reduceByYear.count}} 条</span>
        </div>
      </div>
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import {
    findAdminData
  } from "@/api/admin.js"
  export default {
    name: 'AdminHome',
    data() {
      return {
        title: '管理员汇总',
        adminName: '',
        curDate: '',
        adminData: ''
      }
    },
    mounted() {
      this.getAdminData()
    },
    methods: {
      async getAdminData() {
        this.adminName = this.$store.state.userinfo.name
        this.curDate = this.formatTime(new Date())
        await findAdminData().then(res => {
          console.log(res)
          if (res.code == 0) {
            this.adminData = res.data
          }
        })
      },
      formatTime(date) {
        var date = new Date(date)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")
        let week = weeks[new Date().getDay()]
        return year + '-' + month + '-' + day + ' ' + week
      }
    }
  }

</script>


<style lang="scss" scoped>
  .admin-home {
    .admin-info {
      font-size: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;

      span {
        padding-bottom: 15px;
      }

      .name {
        padding-top: 15px;
        font-size: 24px;
        font-weight: bold;
      }
    }

    .summary-list {
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 195px);
      overflow: auto;

    }

    .summary-item:first-child,
    .summary-item:last-child {
      background:#f5f5f5;
    }

    .summary-item {
      font-size: 18px;
      padding: 0 10px 10px 10px;

      .the-more,
      .the-less {
        display: flex;
        flex-direction: column;
        padding: 10px 0;

        span:nth-child(2) {
          margin: 6px 0;
          text-indent: 20px;
        }
      }

      .num {
        text-align: right;
        font-size: 16px;
      }

      .the-more {
        border-bottom: 1px solid #eee;
      }

    }
  }

</style>
