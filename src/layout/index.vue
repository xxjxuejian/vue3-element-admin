<!-- 模板页 一个侧边栏，一个顶部-->
<script setup>
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import variables from '@/styles/variables.module.scss'
</script>

<template>
  <div class="wh-full">
    <!-- 侧边栏 -->
    <Sidebar class="sidebar-container"></Sidebar>

    <!-- 主内容区域 -->
    <div class="main-container">
      <!-- 顶部导航栏: 导航栏+标签页 -->
      <div class="fixed-header">
        <Navbar></Navbar>
        <!-- <TagsView /> -->
      </div>
    </div>

    <!-- 主内容 -->
    <!-- <AppMain /> -->
  </div>
</template>

<style scoped lang="scss">
// 侧边栏 脱离文档流的
.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: $sidebar-width;
  transition: width 0.28s;
  background-color: $menu-background;
}

// 主内容区域 ,侧边栏以外的部分,为什么需要动画,因为侧边栏折叠时,这个区域要变大,需要过渡
.main-container {
  position: relative;
  height: 100%;
  margin-left: $sidebar-width;
  overflow-y: auto;
  transition: margin-left 0.28s;

  // 顶部导航栏,fixed定位了,宽度就是自适应的,不是整行了
  .fixed-header {
    // width: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
    transition: width 0.28s;
    background-color: aqua;
  }
}
</style>
