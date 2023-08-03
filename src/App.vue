<script setup lang="ts">

</script>

<template>
  <div class="container clear">
    <HospitalTop/>
    <div class="content">
      <router-view></router-view>
    </div>
    <HospitalBottom/>
    <Login/>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  /*flex布局主轴方向设置为纵向，从上到下*/
  flex-direction: column;
  /*flex容器内的项目纵轴方向上居中，这是设置垂直居中的一种方式，还有一种方式是设置display为行内，然后设置height和父组件同高并且设置text-align为center*/
  align-items: center;
  .content {
    min-height: 700px;
    margin-top: 70px;
    width: 1200px;
    margin-bottom: 50px;
  }
}

</style>