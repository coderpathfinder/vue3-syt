import {defineStore} from "pinia"
import {reqUserLogin} from "@/api/hospital";
import {LoginData, UserLoginResponseData, UserInfo} from '@/api/hospital/type.ts';

const useUserStore = defineStore('User', {
    state: () => {
        return {
            //登录弹窗显示控制
            visiable: false,
            //登录用户信息
            userInfo: (localStorage.getItem('USERINFO')==null?{}:JSON.parse(localStorage.getItem('USERINFO') as string)) as UserInfo
        }
    },
    actions: {
        async userLogin(loginParam: LoginData) {
            let result: UserLoginResponseData = await reqUserLogin(loginParam)
            if(result.code == 200) {
                this.userInfo  = result.data
                //本地持久化存储
                localStorage.setItem('USERINFO', JSON.stringify(this.userInfo))
                return 'ok'
            }else {
                return Promise.reject(new Error(result.message))
            }
        },
        //退出登录方法
        logout() {
            //清空仓库的数据
            this.userInfo = { name: '', token: '' }
            //清空本地存储的数据
            localStorage.removeItem('USERINFO')
        },
    },
    getters: {

    }
})

export default useUserStore