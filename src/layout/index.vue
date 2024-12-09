<!-- 模板页 一个侧边栏，一个顶部-->
<script setup>
import { computed } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain/index.vue'
import { useAppStore } from '@/stores'
import variables from '@/styles/variables.module.scss'

const appStore = useAppStore()

const styleObj = computed(() => ({
  hiddenSidebar: !appStore.sidebar.opened,
}))
</script>

<template>
  <div class="wh-full" :class="styleObj">
    <!-- 侧边栏 ,侧边栏在菜单展开或者收起时：宽度不同-->
    <Sidebar class="sidebar-container"></Sidebar>

    <!-- 主内容区域 ：在侧边栏在菜单展开或者收起时，margin-left不同-->
    <div class="main-container">
      <!-- 顶部导航栏: 导航栏+标签页 -->
      <div class="fixed-header">
        <Navbar></Navbar>
        <!-- <TagsView /> -->
      </div>

      <!-- 主内容 -->
      <AppMain />
    </div>
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

  // el-menu关闭过渡，但是sidebar-container有过渡，el-menu有边框，展开或者关闭时，两者的过渡不一致，会有一个边框闪现，所以需要重置边框
  :deep(.el-menu) {
    border: none;
  }
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
  }
}

// 侧边栏折叠时，外层容器会有这个类，然后设置里面的sidebar的宽度和main的margin-left
.hiddenSidebar {
  .sidebar-container {
    width: $sidebar-width-collapsed;
  }

  .main-container {
    margin-left: $sidebar-width-collapsed;
  }
}
</style>
