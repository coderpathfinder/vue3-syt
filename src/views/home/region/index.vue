<script setup lang="ts">
import {onMounted, ref} from "vue"
import {reqHospitalLevelAndRegion} from "@/api/home"
import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from "@/api/home/type"

defineOptions({
  name: 'Region'
})

const regionList = ref<HospitalLevelAndRegionArr>([])

let activeFlag = ref('')

onMounted(()=>{reqRegionData()})

const reqRegionData = async () => {
  let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('BeiJin')
  if(result.code == 200) {
    regionList.value = result.data
  } else {

  }
}

const changeRegion = (value:string) => {
  activeFlag.value = value
  $emit('getDistrictCode', value)
}

let $emit = defineEmits(['getDistrictCode'])

</script>

<template>
<div class="region">
  <div class="content">
    <div class="left">地区：</div>
    <div>
      <ul class="right">
        <li :class="{active:activeFlag==''}" @click="changeRegion('')">全部</li>
        <li :class="{active:activeFlag==region.value}" @click="changeRegion(region.value)" v-for="region in regionList" :key="region.value">{{region.name}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 20px;
  .content {
    display: flex;
    .left {
      min-width: 50px;
      margin: 5px 0;
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 5px 5px;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>