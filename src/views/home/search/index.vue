<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {ref} from "vue";
import {HospitalInfo} from "@/api/home/type"
import {reqHospitalInfo} from "@/api/home"
import {useRouter} from "vue-router"

defineOptions({
  name: 'Search'
})

let $router = useRouter()

let hospitalSearchName = ref('')

const searchHospital = async (keyword: string, callback: any=(arr: any)=>{return arr}) => {
  let result: HospitalInfo = await reqHospitalInfo(keyword)
  if(result.code==200) {
    return callback(result.data.map(item => {
      return {
        value: item.hosname,
        code: item.hoscode
      }
    }))
  }else {
    return callback([])
  }
}

const goDetail = (hospital: {value: string, code: string}) => {
  $router.push({path: '/hospital/register', query:{code: hospital.code}})
}

</script>

<template>
<div class="search">
  <el-autocomplete
      clearable
      placeholder="请你输入医院名称"
      v-model="hospitalSearchName"
      :fetch-suggestions="searchHospital"
      :trigger-on-focus="false"
      @select="goDetail"
  />
  <el-button type="primary" size="default" :icon="Search"></el-button>
</div>
</template>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  /* sass的深度选择器，可以通过scoped选择到子组件内的元素 */
  ::v-deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>