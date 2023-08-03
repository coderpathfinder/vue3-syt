<script setup lang="ts">
//引入组合式API函数ref
import { ref, watch } from "vue";

defineOptions({
  name: 'CountDown'
})
//倒计时的时间
let time = ref<number>(5);

//接受父组件传递过来的props->flag:用于控制计数器组件显示与隐藏的
let props = defineProps(["flag"]);
let $emit = defineEmits(['getFlag']);

//监听父组件传递过来props数据变化
watch(
    () => props.flag,
    () => {
      //开启定时器
      let timer = setInterval(() => {
        time.value--;
        if (time.value == 0) {
          //通知父组件倒计时模式结束
          $emit('getFlag',true);
          //清除定时器
          clearInterval(timer);
        }
      }, 1000);
    },
    {
      immediate: true,
    }
);

</script>

<template>
<span style="color: rgba(127,127,127,0.55); font-weight: 400">
  已获取验证码({{ time }}s)
</span>
</template>

<style scoped lang="scss">

</style>