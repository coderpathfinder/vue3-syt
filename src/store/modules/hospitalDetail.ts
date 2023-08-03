import {defineStore} from "pinia"

import {reqHospitalDetail, reqHospitalDepartment} from "@/api/hospital";
import {DepartmentResponseData, HospitalDetail, HospitalInfo, DepartmentArr} from "@/api/hospital/type.ts";

const useDetailStore = defineStore('Detail', {
    state: () => {
        return {
            hospitalInfo: {} as HospitalInfo,
            hospitalDepartment: [] as DepartmentArr
        }
    },
    actions: {
        async getHospitalInfo(code: string) {
            let result: HospitalDetail = await reqHospitalDetail(code)
            if(result.code == 200) {
               this.hospitalInfo  = result.data
            }else {

            }
        },

        async getHospitalDepartment(code: string) {
            let result: DepartmentResponseData = await reqHospitalDepartment(code)
            if(result.code == 200) {
                this.hospitalDepartment  = result.data
            }else {

            }
        }
    },
    getters: {

    }
})

export default useDetailStore