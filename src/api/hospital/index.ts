
import request from "@/utils/request"
import {
    DepartmentResponseData, DoctorInfoData, DoctorResponseData,
    HospitalDetail,
    HospitalWordData,
    LoginData,
    UserLoginResponseData, UserResponseData
} from "@/api/hospital/type.ts";

enum API {
    //获取已有的医院的数据接口地址
    HOSPITAL_DETAIL_URL = '/hosp/hospital/',
    //获取某一个医院的科室的数据
    HOSPITAL_DEPARTMENT_URL = '/hosp/hospital/department/',
    //获取验证码接口
    GET_USER_CODE_URL = '/sms/send/',
    //用户登录接口
    USER_LOGIN_URL = '/user/login',
    //获取某一个医院的某一个科室预约挂号数据
    HOSPITAL_WORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    //获取医院某一个科室某一天相应医生排班的数据
    HOSPITAL_DOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
    //获取某一个账号下就诊人的信息
    GET_USER_URL = '/user/patient/auth/findAll',
    //获取挂号医生的信息
    GET_DOCTOR_URL='/hosp/hospital/getSchedule/'
}

//获取医院的数据
export const reqHospitalDetail = (code: string) => request.get<any, HospitalDetail>(API.HOSPITAL_DETAIL_URL + code)

//获取医院科室的接口
export const reqHospitalDepartment = (code: string) => request.get<any, DepartmentResponseData>(API.HOSPITAL_DEPARTMENT_URL + code)

//获取验证码接口
export const reqCode = (phone: string) => request.get<any, any>(API.GET_USER_CODE_URL + phone)

//用户登录接口
export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USER_LOGIN_URL, data)

//获取预约挂号的数据
export const reqHospitalWork = (page: number, limit: number, code: string, depcode: string) => request.get<any, HospitalWordData>(API.HOSPITAL_WORK_URL + `${page}/${limit}/${code}/${depcode}`)

//获取医生排班的数据
export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string) => request.get<any, DoctorResponseData>(API.HOSPITAL_DOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)

//获取某一个账号下就诊人信息
export const reqGetUser = () => request.get<any, UserResponseData>(API.GET_USER_URL);

//获取挂号医生的信息
export const reqDoctorInfo = (scheduleId:string)=>request.get<any,DoctorInfoData>(API.GET_DOCTOR_URL+scheduleId);