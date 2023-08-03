
import request from "@/utils/request"
import type {HospitalInfo, HospitalLevelAndRegionResponseData, HospitalResponseData} from "@/api/home/type"

enum API {
    //获取已有的医院的数据接口地址
    HOSPITAL_URL = '/hosp/hospital/',
    //获取医院的等级与地区接口
    HOSPITAL_LEVEl_AND_REGION_URL = '/cmn/dict/findByDictCode/',
    //根据关键字医院的名字获取数据
    HOSPITAL_INFO_URL = '/hosp/hospital/findByHosname/'
}

//获取医院的数据
export const reqHospital = (page: number, limit: number, hosType: string, districtCode: string) => request.get<any, HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hosType}&districtCode=${districtCode}`)

export const reqHospitalLevelAndRegion = (dictCode: string) => request.get<any, HospitalLevelAndRegionResponseData>(API.HOSPITAL_LEVEl_AND_REGION_URL + dictCode)
//根据关键字获取医院的数据进行展示
export const reqHospitalInfo = (hosName: string) => request.get<any, HospitalInfo>(API.HOSPITAL_INFO_URL + hosName)