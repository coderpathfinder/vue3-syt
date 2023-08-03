<script setup lang="ts">
//@ts-ignore
import { ElMessage } from "element-plus";
import {User, Lock} from "@element-plus/icons-vue";
import useUserStore from '@/store/modules/user'
import {reqCode} from "@/api/hospital";
import {ref, reactive, computed} from "vue";
import CountDown from '@/components/countdown/index.vue'

defineOptions({
  name: 'Login'
})

let userStore = useUserStore()

const closeLogin = () => {
  dialogClose()
  userStore.visiable = false
};

let loginTypeIsPhone = ref(true)

const changeLoginType = (value: boolean) => {
  loginTypeIsPhone.value = value
}

let codeFlag = ref(true)

let loginParam = reactive({
  phone: '',
  code: ''
})

//自定义校验规则:手机号码自定义校验规则
const validatorPhone = (_: any, value: any, callBack: any) => {
  //rule:即为表单校验规则对象
  //value:即为当前文本的内容
  //callBack:回调函数
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  if (reg.test(value)) {
    callBack()
  } else {
    callBack(new Error("请输入正确的手机号码格式"))
  }
}
//验证码自定义校验规则
const validatorCode = (_: any, value: any, callBack: any) => {
  //rule:即为表单校验规则对象
  //value:即为当前文本的内容
  //callBack:回调函数
  if (/^\d{6}$/.test(value)) {
    callBack()
  } else {
    callBack(new Error("请输入正确的验证码格式"))
  }
}
//表单校验的规则对象
const rules = {
  //手机号码校验规则
  //required:代表当前字段务必进行校验
  //message:代表的校验错误的提示信息
  //trigger:代表表单校验触发的时机  change:文本发生变化的时候进行校验  blur:失却焦点的时候触发校验
  //min:代表的是最小位数
  //max:代表的是最大的位置
  // phone: [{ required: true, message: "手机号码务必11位", trigger: "change", min: 11 }],
  // code: [{ required: true, message: "验证码务必6位", trigger: "blur", min: 6 }],

  phone: [{ trigger: "change", validator: validatorPhone }],
  code: [{ trigger: "change", validator: validatorCode }],
}

let form = ref<any>();

//计算属性校验手机号
let phoneValid = computed(()=>{
  //手机号码正则表达式
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  //返回布尔值:真代表手机号码、假代表的即为不是手机号码
  return reg.test(loginParam.phone)
})

const getCode = async () => {
  codeFlag.value = false
  let result = await reqCode(loginParam.phone)
  if(result.code == 200&&result.data) {
    loginParam.code = result.data
  }else {
    ElMessage({
      type: "error",
      message: '获取验证码错误',
    })
  }
}

const getFlag = (value: boolean) => {
  codeFlag.value = value
}

const dialogClose = () => {
  loginParam.phone = ''
  loginParam.code = ''
  form.value.resetFields()
}

const userLogin = async () => {
  try {
    //提交表单先做一次总的表单验证，不通过则不能提交
    await form.value.validate();
    console.log('表单总校验通过')
    await userStore.userLogin(loginParam)
    dialogClose()
    userStore.visiable = false
  } catch (e) {
    ElMessage({
      type: 'error',
      message: (e as Error).message
    })
  }
}

</script>

<template>
<div class="login-container">
  <!-- title:对话框左上角的标题 v-model:控制对话框显示与隐藏 -->
  <el-dialog v-model="userStore.visiable" title="用户登录" ref="dialog" @close="dialogClose">
    <div class="content">
      <el-row>
        <el-col :span="12">
          <div v-if="loginTypeIsPhone == true">
            <div class="left">
              <el-form :model="loginParam" :rules="rules" ref="form">
                <el-form-item prop="phone">
                  <el-input v-model="loginParam.phone" placeholder="请输入手机号码" :prefix-icon="User"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input v-model="loginParam.code" placeholder="请输入验证码" :prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" :disabled="(!phoneValid)||(!codeFlag)">
                    <span v-if="codeFlag" style="color: rgba(127,127,127,0.55); font-weight: 400" @click="getCode">获取验证码</span>
                    <CountDown v-else :flag="codeFlag" @getFlag="getFlag"/>
                  </el-button>
                </el-form-item>
              </el-form>
              <div class="bottom">
                <el-button @click="userLogin" :disabled="(!phoneValid)||(loginParam.code.length<6)" style="width: 90%;" type="primary" size="default">用户登录</el-button>
                <p @click="changeLoginType(false)">微信扫码登录</p>
                <svg @click="changeLoginType(false)"
                    t="1685263287521"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2450"
                    width="32"
                    height="32"
                >
                  <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#28C445"
                      p-id="2451"
                  ></path>
                  <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#28C445"
                      p-id="2452"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="left">
              微信扫码登录
              <p @click="changeLoginType(true)">手机号登录</p>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <div class="right-content">
              <div class="top">
                <div class="item">
                  <img src="../../assets/images/code_app.png" alt="" />
                  <svg
                      t="1685263287521"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2450"
                      width="16"
                      height="16"
                  >
                    <path
                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                        fill="#cdcdcd"
                        p-id="2451"
                    ></path>
                    <path
                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                        fill="#cdcdcd"
                        p-id="2452"
                    ></path>
                  </svg>
                  <p>微信扫一扫关注</p>
                  <p>“快速预约挂号”</p>
                </div>
                <div class="item">
                  <img src="../../assets/images/code_login_wechat.png" alt="" />
                  <svg
                      t="1685263518283"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="3668"
                      width="16"
                      height="16"
                  >
                    <path
                        d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                        fill="#000000"
                        p-id="3669"
                    ></path>
                  </svg>
                  <p>扫一扫下载</p>
                  <p>“预约挂号”APP</p>
                </div>
              </div>
            </div>
            <p class="tip">尚医通官方指定平台</p>
            <p class="tip">快速挂号 安全放心</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <el-button type="primary" size="default" @click="closeLogin">关闭弹窗</el-button>
    </template>
  </el-dialog>
</div>
</template>

<style scoped lang="scss">
.login-container {
  /*子组件内部元素选取需要使用深度选择器*/
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .left {
    padding: 20px;
    border: 1px solid #ccc;
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin: 10px 0;
      }
    }
  }
  .right {
    .right-content {
      .top {
        display: flex;
        justify-content: space-around;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 130px;
            height: 130px;
          }
          p {
            margin: 5px 0;
          }
        }
      }
    }
    .tip {
      font-size: 18px;
      font-weight: 600;
      color: #7f7f7f;
      font-style: italic;
      text-align: center;
      margin: 25px 0;
    }
  }
}
</style>