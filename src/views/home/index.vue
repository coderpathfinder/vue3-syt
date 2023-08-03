<script setup lang="ts">
import {onMounted, ref} from "vue"
import { reqHospital } from "@/api/home"
import Search from '@/views/home/search/index.vue'
import Level from '@/views/home/level/index.vue'
import Region from '@/views/home/region/index.vue'
import Card from '@/views/home/card/index.vue'
import Right from '@/views/home/right/index.vue'

import type {Content, HospitalResponseData} from "@/api/home/type"

let pageNo = ref(1)
let pageSize = ref(10)
let total = ref(0)

let hospitalList = ref<Content>([])

let hosType = ref('')
let districtCode = ref('')



onMounted(()=>{
  getHospitalInfo()
})

const getHospitalInfo = async () => {
  let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hosType.value, districtCode.value)
  if(result.code==200) {
    total.value = result.data.totalElements
    hospitalList.value = result.data.content
  }else {

  }
}

const pageNoChange = () => {
  getHospitalInfo()
}

const pageSizeChange = () => {
  pageNo.value = 1
  getHospitalInfo()
}

const getLevel = (level: string) => {
  hosType.value = level
  getHospitalInfo()
}

const getDistrictCode = (region: string) => {
  districtCode.value = region
  getHospitalInfo()
}



</script>

<template>
<div class="home">
  <!-- 轮播图 -->
  <el-carousel height="350px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img class="carousel-img" src="../../assets/images/web-banner-1.png" alt="" />
    </el-carousel-item>
  </el-carousel>
  <!-- 搜索框 -->
  <Search/>
  <!-- 医院展示 -->
  <el-row :gutter="20">
    <el-col :span="20">
      <Level @getLevel="getLevel"/>
      <Region @getDistrictCode="getDistrictCode"/>
      <div class="hospital" v-if="hospitalList.length>0">
        <Card class="card-item" v-for="item in hospitalList" :key="item.id" :hospitalInfo="item" />
      </div>
      <div class="hospital-empty" v-else>
        <el-empty description="没有数据" />
      </div>
      <!-- 分页器 -->
      <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="pageNoChange"
          @size-change="pageSizeChange"
      />
    </el-col>
    <el-col :span="4">
      <Right />
    </el-col>
  </el-row>
</div>
</template>

<style scoped lang="scss">
.home{
  .carousel-img {
    width: 100%;
    height: 350px;
  }

  .hospital {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .card-item {
      width: 49%;
      margin-bottom: 10px;
    }
  }
  .hospital-empty {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

</style>