<template>
  <div class="release-task">
    <van-nav-bar title="发布任务" left-arrow @click-left="$emit('back')"  class="bluenav"/>
    <!-- <nav-bar :title='title' :isLeftArrow='isLeftArrow'></nav-bar> -->
    <van-cell-group>
      <!-- <div :class="[aaa&&bbb ==1 ? 'a':aaa&&bbb == 2 ? 'b' : 'c']">{{aaa && bbb == "1" ? '123' : (aaa && bbb == '2') ? '456' : '789'}}</div> -->
      <van-field v-model="taskObj.title" rows="2" autosize label="任务标题" type="textarea" maxlength="50"
        placeholder="请输入任务标题" show-word-limit required/>
      <van-field v-model="taskObj.content" rows="2" autosize label="任务内容" type="textarea" maxlength="100"
        placeholder="请输入任务内容" show-word-limit required/>
      <!-- <van-field class="score" v-model="taskObj.score" rows="1" label="积分" type="number" min="0" placeholder="请输入积分" required/> -->
      
      <!-- 数字键盘 -->
      <van-field label="积分" readonly required clickable v-model="taskObj.score" @touchstart.native.stop="scoreShow = true"  placeholder="请输入积分(负数代表扣分)"/>
      <van-number-keyboard v-model="taskObj.score" :show="scoreShow" :maxlength="3" @blur="scoreShow = false" safe-area-inset-bottom  extra-key="-"/>


      <van-cell title="截止时间" is-link :value="taskObj.endTime" @click="timeShow = true" required/>
      <van-popup v-model="timeShow" position="bottom" :style="{ height: '40%' }"   >
        <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @confirm="confirmTime" @cancel="timeShow = false;" :formatter="formatter"/>
      </van-popup>

      <!-- <van-cell title="截止时间" is-link :value="taskObj.endTime" @click="isDateShow = true" />
      <van-calendar v-model="isDateShow" color="#1989fa" @confirm="dateConfirm" /> -->
      <van-cell is-link @click="isMemberShow=!isMemberShow" required>选择人员
        <span class="tip">请选择</span>
      </van-cell>
      <div class="main-box" style="margin:5px 10px;">
        <van-tag closeable round plain @close="remove(index)" v-for="(item,index) in finalList" :key="index">
          {{item.mName}}&#x3000;
        </van-tag>
      </div>
      <van-popup round v-model="isMemberShow" position="bottom" :style="{ height: '60%' }">
        <div class="member-title main-box" >
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
            <van-checkbox-group v-model="taskObj.employeesId" class="men-area" v-if="memberList.length !=0 ">
              <van-checkbox :name="`${val.mId}`" v-for="(val,i) in memberList" :key="i" @click="menConfirm(i)">
                {{val.mName}}
              </van-checkbox>
            </van-checkbox-group>
            <van-checkbox-group v-model="taskObj.employeesId" class="men-area" v-else>
              <p style="font-size:14px;color:#323233">暂无数据</p>
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
  import { findAlldepart,findAllList } from "@/api/depart";
  import { formtime } from "@/util/base";

  export default {
    name: 'ReleaseTask',
    data() {
      return {
        title: '发布任务',
        isLeftArrow: true,
        taskObj: {
          title: '',
          content: '',
          score: '', //积分
          endTime: '请选择', //截止时间
          degree: '0',    // 程度 0:待完成 1:已完成 2:未完成
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
        curDepId:'',//当前部门Id
        finalList: [], //最终选中
        loading: false,
        finished: false,

        timeShow:false,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),

        // 数字键盘
        scoreShow:false,

      }
    },
    mounted() {
      this.getDeptList()
    },

    methods: {
      // 获取部门列表
      async getDeptList() {
        await findAlldepart().then(res => {
          if (res.code == 0) {
            this.deptList = res.data
            this.list = this.deptList
          }
        });
      },
      // 格式化日期
      formatDate(date) {
       return `${date.getFullYear()}-${date.getMonth() + 1}~${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
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
        this.taskObj.employeesId.splice(i, 1)
      },
      async addTask() {
        // console.log(this.taskObj.title)
        // console.log(this.taskObj.score)
        // console.log(this.taskObj.employeesId)
        // console.log(this.taskObj.endTime)
        if (this.taskObj.title == '' ||  this.taskObj.content == '' || this.taskObj.employeesId == '' || this.taskObj.endTime == '' ) {
          this.$toast("请输入完整内容再提交");
          return
        }else if(!(this.taskObj.score<0)){
          // 分数大于0
          if(this.taskObj.score.indexOf("-") != -1){
            this.$toast("请输入正确格式的积分");
            return;
          }else if(this.taskObj.score > 100){
            this.$toast("请输入100分以内的积分");
            return;
          }else{
            this.taskObj.employeesId=this.taskObj.employeesId.map(Number)
            await addTask(this.taskObj).then(res => {
              if (res.code == 0) {
                this.$toast.success("发布成功");
                setTimeout(() => {
                  this.$emit("back");
                },800)   
              }
            })
          }
        }
        // else if(!this.taskObj.score && this.taskObj.score != 0){
        //   this.$toast("请输入正确格式的积分");
        //   // 分数大于0
        // } 
        else {
          this.taskObj.employeesId=this.taskObj.employeesId.map(Number)
          await addTask(this.taskObj).then(res => {
            if (res.code == 0) {
              this.$toast.success("发布成功");
              setTimeout(() => {
                this.$emit("back");
              },800)   
            }
          })
        }
      },
      confirmTime(value){
        let now =formtime(new Date())
        now=new Date(now.replace(/\-/g, "\/"))
        let d =formtime(value)
        let end = new Date(d.replace(/\-/g, "\/"))
        if (end <= now) {
          this.$toast.fail("截至时间不能小于当前时间！")
          return
        }else{
          this.taskObj.endTime = d
          this.timeShow = false;
        }
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
      }
    }
  }

</script>

<style lang="scss" scoped>
  .release-task {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    .member-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      padding: 20px;
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
        font-size: 8px;
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
      // margin-right: 15px;
      font-size: 15px;
      width:100px;
    }
    .van-tabs__content{
      padding-left:20px;
      height: 280px;
      overflow-y: scroll;
    }

    .van-cell__title {
      font-size: 15px;
    }

    [class*=van-hairline]::after {
      border: none;
    }

    .van-cell:not(:last-child)::after {
      border: none !important;
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
