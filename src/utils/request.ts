//对于axios函数库进行二次封装
//目的：使用axios的请求响应拦截器做统一处理，请求头添加参数，响应的统一错误处理等
import axios from "axios"

//@ts-ignore
import { ElMessage } from 'element-plus';

import useUserStore from "@/store/modules/user.ts";

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

request.interceptors.request.use(config=>{
    let userStore = useUserStore()
    if(userStore.userInfo.token) {
        config.headers.token = userStore.userInfo.token
    }
    return config
})

request.interceptors.response.use(response=>{
    return response.data
}, error => {
    //处理http网络错误
    let status = error.response.status;
    switch (status) {
        case 404:
            //错误提示信息
            ElMessage({
                type: 'error',
                message: '请求失败路径出现问题'
            })
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
            ElMessage({
                type: 'error',
                message: '服务器繁忙'
            })
            break;
        case 401:
            ElMessage({
                type: 'error',
                message: '参数有误'
            })
            break;
    }
    return Promise.reject(new Error(error.message))
})

export default request