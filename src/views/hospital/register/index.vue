<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail.ts";
import useUserStore from "@/store/modules/user.ts";
import {ref} from "vue";
import {useRouter,useRoute} from "vue-router";
import {Department} from "@/api/hospital/type.ts";

defineOptions({
  name: 'Register'
})

let hospitalDetailStore = useDetailStore()
let userStore = useUserStore()

let $router = useRouter()

let $route = useRoute()

let activeDepartmentIndex = ref(0)

const login = (item: Department) => {
  if(!userStore.userInfo.name) {
    userStore.visiable = true
  }else {
    $router.push({path:'/hospital/register_step1',query:{code:$route.query.code,depcode:item.depcode}})
  }
}

const changeDepIndex = (index: number) => {
  activeDepartmentIndex.value = index

  //让对应的科室滚到父容器最顶端，可以通过block参数配置滚动到父容器的中心center或者顶部start、底部end
  let allH1 = document.querySelectorAll('.cur')
  allH1[activeDepartmentIndex.value].scrollIntoView({
    behavior: 'smooth'//滚动过渡动画
  })
}

</script>

<template>
  <div class="register">
    <div class="top">
      <div class="title">{{hospitalDetailStore.hospitalInfo.hospital?.hosname}}</div>
      <div class="level">
        <svg
            t="1685174493331"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2418"
            width="16"
            height="16"
        >
          <path
              d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
              p-id="2419"
              fill="#d81e06"
          ></path>
        </svg>
        <span>{{hospitalDetailStore.hospitalInfo.hospital?.param.hostypeString}}</span>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${hospitalDetailStore.hospitalInfo.hospital?.logoData}`" alt="">
      </div>
      <div class="right">
        <div style="font-size: 18px;">挂号规则</div>
        <div class="time">预约周期：10天  放号时间：{{
            hospitalDetailStore.hospitalInfo.bookingRule?.releaseTime
          }}  停挂时间：{{
            hospitalDetailStore.hospitalInfo.bookingRule?.stopTime
          }}</div>
        <div class="address">
          具体位置：{{hospitalDetailStore.hospitalInfo.hospital?.param.fullAddress}}
        </div>
        <div class="route">
          具体路线：{{hospitalDetailStore.hospitalInfo.hospital?.route}}
        </div>
        <div class="releasetime">
          退号时间：就诊前一工作日{{
            hospitalDetailStore.hospitalInfo.bookingRule?.quitTime
          }}前取消
        </div>
        <div class="rule">预约挂号规则</div>
        <div
            class="ruleInfo"
            v-for="(item, index) in hospitalDetailStore.hospitalInfo.bookingRule?.rule"
            :key="index">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="department">
      <div class="left">
        <ul>
          <li @click="changeDepIndex(index)" :class="{active:activeDepartmentIndex==index}" v-for="(department, index) in hospitalDetailStore.hospitalDepartment" :key="department.depcode">{{department.depname}}</li>
        </ul>
      </div>
      <div class="right">
        <div class="showDepartment" v-for="dep in hospitalDetailStore.hospitalDepartment" :key="dep.depcode">
          <h1 class="cur">{{dep.depname}}</h1>
          <ul>
            <li @click="login(depItem)" v-for="depItem in dep.children" :key="depItem.depcode">{{depItem.depname}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register {
  .top {
    display: flex;
    .title {
      font-size: 30px;
      font-weight: 600;
    }
    .level {
      color: #7f7f7f;
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      span {
        margin-left: 5px;
      }
    }
  }
  .content {
    display: flex;
    margin-top: 30px;
    .left {
      width: 80px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      /* 占满剩余空间 */
      flex: 1;
      margin-left: 20px;
      .time, .address, .route, .releasetime, .ruleInfo {
        font-size: 14px;
        margin-top: 10px;
        color: #7f7f7f;
      }
      .rule {
        font-size: 16px;
        margin: 15px 0;
      }
    }
  }
  .department {
    margin-top: 20px;
    width: 100%;
    height: 700px;
    display: flex;
    .left {
      width: 80px;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        background: rgb(248, 248, 248);
        display: flex;
        /*主轴为纵向*/
        flex-direction: column;
        li {
          cursor: pointer;
          flex: 1;
          text-align: center;
          color: #7f7f7f;
          font-size: 12px;
          line-height: 40px;
          &.active {
            border-left: 1px solid red;
            color: red;
            background: white;
          }
        }
      }
    }
    .right {
      flex: 1;
      margin-left: 20px;
      /*滚动条*/
      overflow: auto;
      /*隐藏滚动条*/
      &::-webkit-scrollbar {
        display: none;
      }
      .showDepartment {
        margin-top: 10px;
        margin-bottom: 20px;
        h1 {
          background-color: rgb(248, 248, 248);
          color: #7f7f7f;
          font-size: 16px;
          margin: 10px 0;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            cursor: pointer;
            font-size: 12px;
            color: #7f7f7f;
            width: 33%;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>