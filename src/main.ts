import { createApp } from 'vue'

//引入清除默认样式的sass
import '@/style/reset.scss'

//引入根组件
import App from '@/App.vue'

//完整引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//国际化文件
//忽略ts类型检查
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//引入全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'

//引入路由
import router from '@/router'

//引入pinia
import pinia from '@/store';

//创建根组件实例
const Vue = createApp(App)
//注册全局组件
Vue.component(HospitalTop.name, HospitalTop)
Vue.component(HospitalBottom.name, HospitalBottom)
Vue.component(Login.name, Login)

//安装vue-router
Vue.use(router)
//安装pinia
Vue.use(pinia)
//安装element-plus
Vue.use(ElementPlus, {
    locale: zhCn,
})

//挂载
Vue.mount('#app')