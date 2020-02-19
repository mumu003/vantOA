<template>
  <div class="point-entry main-cnt">
    <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar>
    <van-cell title="选择规则分类" is-link placeholder="请选择" :value="ruleType" @click="showCategory = true" required/>
    <van-popup v-model="showCategory" position="bottom">
      <van-picker show-toolbar :columns="categoryList" @cancel="showCategory = false" @confirm="categoryConfirm" />
    </van-popup>
    <van-cell title="选择分类" is-link :value="smallRule" placeholder="请选择" @click="showRule = true" required/>
    <van-popup v-model="showRule" position="bottom">
      <van-picker show-toolbar :columns="ruleList" @cancel="showRule = false" @confirm="ruleConfirm" />
    </van-popup>

    <van-cell title="日期" is-link :value="pointObj.applyTime" @click="isDateShow = true" required/>
    <van-popup v-model="isDateShow" position="bottom" :style="{ height: '40%' }"   >
        <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @confirm="dateConfirm" @cancel="isDateShow = false;" :formatter="formatter"/>
    </van-popup>

    <!-- <van-calendar v-model="isDateShow" color="#1989fa" @confirm="dateConfirm" /> -->
    <van-field class="score" v-model="pointObj.add" rows="1" label="积分" type="number" placeholder="请输入积分" disabled />
    <van-field class="reason-cnt" v-model="pointObj.content" rows="2" autosize label="理由" type="textarea" maxlength="50"
        eholder="请输入理由（选填）" show-word-limit />
    <div class="line"></div>

     <van-cell is-link @click="isMemberShow=!isMemberShow" required>选择人员
      <span class="tip">请选择</span>
    </van-cell>
    <div class="main-box people-box">
      <van-tag closeable round plain @close="remove(index)" v-for="(item,index) in finalList" :key="index">
        {{item.mName}}&#x3000;
      </van-tag>

    </div>
    <van-popup round v-model="isMemberShow" position="bottom" :style="{ height: '60%' }">
      <div class="member-title main-box pop-box">
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
          <van-checkbox-group v-model="pointObj.employeesId" class="men-area" v-if="memberList.length !=0 ">
            <van-checkbox :name="`${val.mId}`" v-for="(val,i) in memberList" :key="i" @click="menConfirm(i)">{{val.mName}}</van-checkbox>
          </van-checkbox-group>
          <van-checkbox-group v-model="pointObj.employeesId" class="men-area" v-else>
            <p style="font-size:14px;color:#323233">暂无数据</p>
          </van-checkbox-group>
        </van-tab>
      </van-tabs>
    </van-popup>
    <van-button type="info" class="info-btn" block @click="submit">提交信息</van-button>
  </div>
</template>

<script>
  import { findAlldepart,findAllList} from "@/api/depart";
  import { getruletype,getrule,addPoint} from "@/api/integral";
  import { formtime } from "@/util/base";
  export default {
    name: 'PointEntry',
    data() {
      return {
        title: '积分录入',
        isLeftArrow: true,
        ruleType: '', //规则大类
        bigRuleId: '', //规则大类Id
        ruleList: [],
        showRule: false,
        smallRule: '', //规则小类
        categoryList: [],
        showCategory: false,
        pointObj: {
          rulesId: '', //小类规则Id
          applyTime: '请选择',
          add: 0,
          content: '',
          employeesId: []
        },
        isDateShow: false,
        minDate: new Date(2000, 1, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        isMemberShow: false,
        activeTab: 'dept',
        showPicker: false,
        menChecked:false,
        list: [],
        deptList: [],
        memberList: [],
        activeDept: -1,
        curDepId:'',//当前部门Id
        finalList: [], //最终展示
        loading: false,
        finished: false
      }
    },
    mounted() {
      this.getDeptList()
      this.getCategory()
    },
    methods: {
      init(){
        this.pointObj={
           ulesId: '', 
          applyTime: '',
          add: 0,
          content: '',
          employeesId: []
        }
      },
      // 获取部门列表
      async getDeptList() {
        await findAlldepart().then(res => {
          if (res.code == 0) {
            this.deptList = res.data
            this.list = this.deptList
          }
        });
      },
      // 获取规则类别
      async getCategory() {
        await getruletype().then(res => {
          if (res.code == 0) {
            if (res.data.length>0) {
              this.categoryList = res.data.map(item => ({
                id: item.id,
                text:item.name,
              }))
            } else {
              this.categoryList.push({text: "无",value: ""})
            }
          }
        });
      },
      // 获取积分规则
      async getRule() {
        let data = {
          ruleType: this.bigRuleId
        }
        await getrule(data).then(res => {
          if (res.code == 0) {
            if (res.data.length>0) {
              this.ruleList = res.data.map(item => ({
                id: item.id,
                text:item.name,
                score:item.score
              }))
            } else {
              this.ruleList.push({id: "",text: "无"})
            }
          }
        })
      },
      // 规则大类
      categoryConfirm(value) {
        this.ruleType = value.text
        this.bigRuleId = value.id
        this.showCategory = false
        this.getRule()
      },
      //规则小类
      ruleConfirm(value) {
        this.smallRule = value.text
        this.pointObj.rulesId = value.id
        this.pointObj.add=value.score
        this.showRule = false
      },
      // 格式化日期
      formatDate(date) {
        // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      },
       formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }else if (type === 'day') {
          return `${value}日`
        }else if (type === 'hour') {
          return `${value}时`
        }else if (type === 'minute') {
          return `${value}分`
        }
        return value;
      },
      dateConfirm(time) {
        this.isDateShow = false
        this.pointObj.applyTime = formtime(time)
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
        }, 500)
      },
      // 部门选中
       async deptConfirm(departId, index) {
        this.activeDept = index
        this.curDepId=departId
        let data = {
          departId
        }
        await findAllList(data).then(res => {
          if (res.code == 0) {
            // this.memberList=res.data
            this.memberList = res.data.map(item => ({
                mId: item.id,
                mName:item.name,
                isChecked:false
              }))
              for(let i in this.finalList){
              for(let j in this.memberList){
                if(this.memberList[j].mId==this.finalList[i].mId){
                  this.memberList[j].isChecked=true
                }
              }
            }
          }
        })
      },
       menConfirm(i) {
          let _obj = Object.assign(this.memberList[i], {
            deptId: this.curDepId,
            mIndex: i
          });
         if(!this.memberList[i].isChecked){
          this.finalList.push(_obj)
          this.memberList[i].isChecked=true
         }else{
           for(let j in this.finalList){
             if(this.finalList[j].mId==this.memberList[i].mId){
               this.finalList.splice(j,1)
               this.memberList[i].isChecked=false
             }
           }
         }
      },
      // 人员选中
      toSelect() {
        this.isMemberShow = false
      },
      remove(i) {
        const curIndex=this.finalList[i].mIndex
        for(let k in this.finalList){
          if(this.finalList[k].deptId==this.curDepId){
            this.memberList[curIndex].isChecked=false
          }
        }
        this.finalList.splice(i, 1)
        this.pointObj.employeesId.splice(i, 1)
      },
      async submit() {
        // console.log(this.pointObj)
        if(this.rulesId==''|| this.pointObj.applyTime==''||this.pointObj.add==''||this.pointObj.employeesId==''){
             this.$toast("请输入完整内容再提交")
        } else {
          this.pointObj.employeesId=this.pointObj.employeesId.map(Number)
          await addPoint(this.pointObj).then(res => {
            if (res.code == 0) {
              this.$toast.success("提交成功");
              this.init()
              setTimeout(()=>{
                this.$router.push({
                  path:'/manager',
                })
              },1000)
            }
          })
        }
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
    .pop-box{
      padding: 20px;
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

    .people-box {
      background: #ffffff;
      padding: 10px ;
      padding-bottom: 20px;
    }
  }

</style>
<style lang="scss">
  .point-entry {
    .van-tab {
      flex: unset;
      font-size: 15px;
      width:100px;
    }
    .van-tabs__content{
      padding-left:20px;
      height: 280px;
      overflow-y: scroll;
    }

    .score .van-field__control {
      text-align: right;
    }

    .van-cell:not(:last-child)::after {
      border: none !important;
    }

    [class*=van-hairline]::after {
      border: none;
    }
    // .van-picker__columns{
    //   [class*=van-hairline]::after {
    //     border: 1px solid #eee;
    //   }
    // }

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
