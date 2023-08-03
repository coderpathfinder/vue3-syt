import {createRouter, createWebHistory} from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: ()=>import('@/views/home/index.vue')
        },
        {
            path: '/hospital',
            component: ()=>import('@/views/hospital/index.vue'),
            children: [
                {
                    path: 'register',
                    component: ()=>import('@/views/hospital/register/index.vue')
                },
                {
                    path: 'close',
                    component: ()=>import('@/views/hospital/close/index.vue')
                },
                {
                    path: 'cancel',
                    component: ()=>import('@/views/hospital/cancel/index.vue')
                },
                {
                    path: 'detail',
                    component: ()=>import('@/views/hospital/detail/index.vue')
                },
                {
                    path: 'notice',
                    component: ()=>import('@/views/hospital/notice/index.vue')
                },
                {
                    path: 'register_step1',
                    component: () => import('@/views/hospital/register/register_step1.vue'),
                    meta:{
                        title:'预约第一步'
                    }
                },
                {
                    path: 'register_step2',
                    component: () => import('@/views/hospital/register/register_step2.vue'),
                    meta:{
                        title:'预约第一步'
                    }
                },
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    //滚动行为
    scrollBehavior() {
        return {
            left:0,
            top: 0
        }
    },
})