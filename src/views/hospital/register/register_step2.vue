<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";

import Visitor from '@/components/visitor/index.vue';

import {useRoute, useRouter} from "vue-router";

import {reqDoctorInfo, reqGetUser} from "@/api/hospital";
import {Doctor, DoctorInfoData, UserArr, UserResponseData} from "@/api/hospital/type.ts";
import {ElMessage} from "element-plus";
import {reqSubmitOrder} from "@/api/user";
import {SubmitOrder} from "@/api/user/types.ts";

defineOptions({name: 'RegisterStep2'})

const goUser = () => {}

let $route = useRoute();
let $router = useRouter();

const changeIndex = (index: number) => {
  if(currentIndex.value == index) {
    currentIndex.value = -1
  }else {
    currentIndex.value = index
  }
}

let currentIndex = ref<number>(-1)

let userArr = ref<UserArr>([])

//存储医生的信息
let docInfo = ref<Doctor>({} as Doctor)

const getUserData = async () => {
  let result: UserResponseData = await reqGetUser()
  if(result.code == 200) {
    userArr.value = result.data
  }else {

  }
}

onMounted(() => {
  getUserData()
  fetchInfo()
})

//获取医生的信息
const fetchInfo = async () => {
  let result: DoctorInfoData = await reqDoctorInfo($route.query.docId as string)
  if (result.code == 200) {
    docInfo.value = result.data
  }
}

//确定挂号按钮的回调
const submitOrder = async () => {
  //医院编号
  let hoscode = docInfo.value.hoscode
  //医生的ID
  let scheduleId = docInfo.value.id
  //就诊人的ID
  let patientId = userArr.value[currentIndex.value].id
  //提交订单
  let result: SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId)
  //提交订单成功
  if (result.code == 200) {
    $router.push({path: "/user/order", query: {orderId: result.data}})
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    })
  }
}

</script>

<template>
<div class="container">
  <h1 class="title">确认挂号信息</h1>
  <!-- 就诊人信息卡片 -->
  <el-card class="box-card">
    <!-- 卡片的头部 -->
    <template #header>
      <div class="card-header">
        <span>请选择就诊人</span>
        <el-button type="success" size="default" :icon="User" @click="goUser">添加就诊人</el-button>
      </div>
    </template>
    <!-- 卡片的身体部分展示就诊人信息 -->
    <div class="user">
      <Visitor
          @click="changeIndex(index)"
          v-for="(user, index) in userArr"
          :key="user.userId"
          class="item"
          :user="user"
          :index="index"
          :currentIndex="currentIndex"/>
    </div>
  </el-card>
  <!-- 医生信息卡片 -->
  <el-card class="box-card">
    <!-- 卡片的头部 -->
    <template #header>
      <div class="card-header">
        <span>挂号信息</span>
      </div>
    </template>
    <!-- 卡片身体部分:展示医生的信息 -->
    <el-descriptions class="margin-top" :column="2" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">就诊日期:</div>
        </template>
        {{ docInfo.workDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">就诊医院:</div>
        </template>
        {{ docInfo.param?.hosname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">就诊科室:</div>
        </template>
        {{ docInfo.param?.depname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">医生姓名:</div>
        </template>
        {{ docInfo.docname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">医生职称:</div>
        </template>
        {{ docInfo.title }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">医生专长:</div>
        </template>
        {{ docInfo.skill }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">医生服务费:</div>
        </template>
        <span style="color: red">{{ docInfo.amount }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- 确认按钮 -->
  <div class="btn">
    <el-button
        type="primary"
        size="default"
        :disabled="currentIndex == -1"
        @click="submitOrder"
    >确认挂号</el-button>
  </div>
</div>
</template>

<style scoped lang="scss">
.container {
  .title {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    margin: 30px 0;
  }
  .box-card {
    margin: 20px 0;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }
  }
}
</style>