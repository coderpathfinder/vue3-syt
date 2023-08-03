<script setup lang="ts">
import {reqHospitalLevelAndRegion} from "@/api/home"
import {onMounted, ref} from "vue"
import {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from "@/api/home/type"

defineOptions({
  name: 'Level'
})

const levelList = ref<HospitalLevelAndRegionArr>([])

let activeFlag = ref('')

onMounted(()=>{reqLevelData()})

const changeLevel = (value:string) => {
  activeFlag.value = value
  $emit('getLevel', value)
}

let $emit = defineEmits(['getLevel'])

const reqLevelData = async () => {
  let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType')
  if(result.code == 200) {
    levelList.value = result.data
  } else {

  }
}

</script>

<template>
<div class="level">
  <h1>医院</h1>
  <div class="content">
    <div class="left">等级：</div>
    <div>
      <ul class="right">
        <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
        <li :class="{active:activeFlag==level.value}" @click="changeLevel(level.value)" v-for="level in levelList" :key="level.value">{{level.name}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.level {
  color: #7f7f7f;
  margin-top: 20px;
  h1 {
    font-weight: 600;
    margin: 10px 0;
  }
  .content {
    display: flex;
    .left {
      min-width: 50px;
      margin: 5px 0;
    }
    .right {
      display: flex;
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